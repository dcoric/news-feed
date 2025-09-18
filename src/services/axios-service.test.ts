import axiosInstance, { AxiosService } from './axios-service';

jest.mock('axios', () => {
  const create = jest.fn(() => ({
    request: jest.fn(),
    interceptors: {
      request: {
        use: jest.fn()
      }
    }
  }));

  return {
    __esModule: true,
    default: { create },
    create
  };
});

describe('AxiosService', () => {
  let service: AxiosService;
  let localStorageMock: { getItem: jest.Mock; setItem: jest.Mock; removeItem: jest.Mock; clear: jest.Mock };
  let sessionStorageMock: { getItem: jest.Mock; setItem: jest.Mock; removeItem: jest.Mock; clear: jest.Mock };
  beforeEach(() => {
    localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn()
    };
    sessionStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn()
    };

    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      writable: true,
      value: localStorageMock
    });

    Object.defineProperty(window, 'sessionStorage', {
      configurable: true,
      writable: true,
      value: sessionStorageMock
    });

    service = new AxiosService();
    service['axios'].request = jest.fn();
    service['axios'].interceptors.request.use = jest.fn();
    sessionStorageMock.getItem.mockReturnValue('GB');
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be a singleton', () => {
    const service2 = new AxiosService();
    expect(service).toBe(service2);
  });

  it('should get storage item from localStorage or sessionStorage', () => {
    localStorageMock.getItem.mockReturnValueOnce('foo');
    expect(service.getStorageItem('key')).toBe('foo');
    localStorageMock.getItem.mockReturnValueOnce(null);
    sessionStorageMock.getItem.mockReturnValueOnce('bar');
    expect(service.getStorageItem('key')).toBe('bar');
  });

  it('should handle errors in getStorageItem', () => {
    localStorageMock.getItem.mockImplementationOnce(() => { throw new Error('fail'); });
    expect(() => service.getStorageItem('key')).not.toThrow();
  });

  it('should call axios.request with correct method', () => {
    const mockRequest = jest.fn().mockResolvedValue('ok');
    service['axios'].request = mockRequest;
    return service.get('/test', {}).then(() => {
      expect(mockRequest).toHaveBeenCalledWith(expect.objectContaining({ method: 'get' }));
    });
  });

  it('should call post, put, patch, delete methods', async () => {
    const mockRequest = jest.fn().mockResolvedValue('ok');
    service['axios'].request = mockRequest;
    await service.post('/test', {});
    await service.put('/test', {});
    await service.patch('/test', {});
    await service.delete('/test', {});
    expect(mockRequest).toHaveBeenCalledTimes(4);
  });

  it('should export a frozen singleton', () => {
    expect(Object.isFrozen(axiosInstance)).toBe(true);
  });
});
