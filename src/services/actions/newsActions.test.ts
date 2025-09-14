import { setCountryNewsSource, fetchTopNews } from './newsActions';
import axiosInstance from '../axios-service';
import { NEWS_COUNTRY_SOURCE, NEWS_PREVIEW_FETCHING, NEWS_PREVIEW_FETCHED } from '../reducers/types';

// Mock axios-service
jest.mock('../axios-service', () => ({
  get: jest.fn()
}));

// Mock sessionStorage
Object.defineProperty(window, 'sessionStorage', {
  value: {
    setItem: jest.fn(),
  },
  writable: true,
});

describe('newsActions', () => {
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    mockDispatch = jest.fn();
    jest.clearAllMocks();
  });

  describe('setCountryNewsSource', () => {
    it('stores country in sessionStorage and dispatches correct action for GB', () => {
      const action = setCountryNewsSource('GB');
      action(mockDispatch);

      expect(window.sessionStorage.setItem).toHaveBeenCalledWith('NEWS_COUNTRY', 'GB');
      expect(mockDispatch).toHaveBeenCalledWith({
        type: NEWS_COUNTRY_SOURCE,
        payload: 'GB',
        longName: 'Great Britain'
      });
    });

    it('stores country in sessionStorage and dispatches correct action for US', () => {
      const action = setCountryNewsSource('US');
      action(mockDispatch);

      expect(window.sessionStorage.setItem).toHaveBeenCalledWith('NEWS_COUNTRY', 'US');
      expect(mockDispatch).toHaveBeenCalledWith({
        type: NEWS_COUNTRY_SOURCE,
        payload: 'US',
        longName: 'United States'
      });
    });

    it('defaults to World for unknown country codes', () => {
      const action = setCountryNewsSource('FR');
      action(mockDispatch);

      expect(window.sessionStorage.setItem).toHaveBeenCalledWith('NEWS_COUNTRY', 'FR');
      expect(mockDispatch).toHaveBeenCalledWith({
        type: NEWS_COUNTRY_SOURCE,
        payload: 'FR',
        longName: 'World'
      });
    });
  });

  describe('fetchTopNews', () => {
    it('dispatches fetching and then fetched actions on successful API call', async () => {
      const mockArticles = [
        { title: 'Test News 1', url: 'http://example.com/1' },
        { title: 'Test News 2', url: 'http://example.com/2' }
      ];

      const mockResponse = {
        data: {
          articles: mockArticles
        }
      };

      (axiosInstance.get as jest.Mock).mockResolvedValue(mockResponse);

      const action = fetchTopNews();
      await action(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith({ type: NEWS_PREVIEW_FETCHING });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: NEWS_PREVIEW_FETCHED,
        payload: mockArticles
      });
    });

    it('dispatches fetching and then error action on API failure', async () => {
      const mockError = new Error('Network Error');
      (mockError as any).toJSON = () => ({ message: 'Network Error' });

      (axiosInstance.get as jest.Mock).mockRejectedValue(mockError);

      // Mock console.error to avoid error logs in tests
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const action = fetchTopNews();

      // Wait for the promise to complete
      await new Promise(resolve => {
        action(mockDispatch);
        setTimeout(resolve, 0);
      });

      expect(mockDispatch).toHaveBeenCalledWith({ type: NEWS_PREVIEW_FETCHING });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: NEWS_PREVIEW_FETCHED,
        error: 'Network Error'
      });

      consoleSpy.mockRestore();
    });

    it('calls axios with correct API endpoint', () => {
      (axiosInstance.get as jest.Mock).mockResolvedValue({ data: { articles: [] } });

      const action = fetchTopNews();
      action(mockDispatch);

      expect(axiosInstance.get).toHaveBeenCalledWith('top-headlines', {});
    });
  });
});