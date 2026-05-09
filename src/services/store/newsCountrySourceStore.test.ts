import { useNewsCountrySourceStore } from './newsCountrySourceStore';

Object.defineProperty(window, 'sessionStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
  },
  writable: true,
});

describe('newsCountrySourceStore', () => {
  beforeEach(() => {
    useNewsCountrySourceStore.setState({
      data: 'GB',
      longName: 'Great Britain'
    });
    jest.clearAllMocks();
  });

  it('returns initial state with default country', () => {
    const state = useNewsCountrySourceStore.getState();
    expect(state.data).toBe('GB');
    expect(state.longName).toBe('Great Britain');
  });

  it('sets country to GB', () => {
    const store = useNewsCountrySourceStore.getState();
    store.setCountry('GB');

    expect(window.sessionStorage.setItem).toHaveBeenCalledWith('NEWS_COUNTRY', 'GB');
    expect(useNewsCountrySourceStore.getState().data).toBe('GB');
    expect(useNewsCountrySourceStore.getState().longName).toBe('Great Britain');
  });

  it('sets country to US', () => {
    const store = useNewsCountrySourceStore.getState();
    store.setCountry('US');

    expect(window.sessionStorage.setItem).toHaveBeenCalledWith('NEWS_COUNTRY', 'US');
    expect(useNewsCountrySourceStore.getState().data).toBe('US');
    expect(useNewsCountrySourceStore.getState().longName).toBe('United States');
  });

  it('defaults to World for unknown country codes', () => {
    const store = useNewsCountrySourceStore.getState();
    store.setCountry('FR');

    expect(window.sessionStorage.setItem).toHaveBeenCalledWith('NEWS_COUNTRY', 'FR');
    expect(useNewsCountrySourceStore.getState().data).toBe('FR');
    expect(useNewsCountrySourceStore.getState().longName).toBe('World');
  });
});
