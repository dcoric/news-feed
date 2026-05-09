import { useNewsPreviewStore } from './newsPreviewStore';
import axiosInstance from '../axios-service';

jest.mock('../axios-service', () => ({
  get: jest.fn()
}));

describe('newsPreviewStore', () => {
  beforeEach(() => {
    useNewsPreviewStore.setState({
      fetching: false,
      fetched: false,
      error: null,
      data: []
    });
    jest.clearAllMocks();
  });

  it('returns initial state', () => {
    expect(useNewsPreviewStore.getState()).toEqual({
      fetching: false,
      fetched: false,
      error: null,
      data: [],
      setFetching: expect.any(Function),
      setFetched: expect.any(Function),
      fetchTopNews: expect.any(Function)
    });
  });

  it('sets fetching state', () => {
    const store = useNewsPreviewStore.getState();
    store.setFetching();

    expect(useNewsPreviewStore.getState()).toEqual({
      fetching: true,
      fetched: false,
      error: null,
      data: [],
      setFetching: expect.any(Function),
      setFetched: expect.any(Function),
      fetchTopNews: expect.any(Function)
    });
  });

  it('sets fetched state with data', () => {
    const mockArticles = [
      { title: 'Test News 1', url: 'http://example.com/1' },
      { title: 'Test News 2', url: 'http://example.com/2' }
    ];

    const store = useNewsPreviewStore.getState();
    store.setFetched(null, mockArticles);

    const state = useNewsPreviewStore.getState();
    expect(state.fetching).toBe(false);
    expect(state.fetched).toBe(true);
    expect(state.error).toBe(null);
    expect(state.data).toEqual(mockArticles);
  });

  it('sets fetched state with error', () => {
    const store = useNewsPreviewStore.getState();
    store.setFetched('Network error');

    const state = useNewsPreviewStore.getState();
    expect(state.fetching).toBe(false);
    expect(state.fetched).toBe(true);
    expect(state.error).toBe('Network error');
    expect(state.data).toEqual([]);
  });

  it('fetches top news successfully', async () => {
    const mockArticles = [
      { title: 'Test News 1', url: 'http://example.com/1' },
      { title: 'Test News 2', url: 'http://example.com/2' }
    ];

    (axiosInstance.get as jest.Mock).mockResolvedValue({
      data: { articles: mockArticles }
    });

    const store = useNewsPreviewStore.getState();
    await store.fetchTopNews();

    const state = useNewsPreviewStore.getState();
    expect(state.fetching).toBe(false);
    expect(state.fetched).toBe(true);
    expect(state.error).toBe(null);
    expect(state.data).toEqual(mockArticles);
    expect(axiosInstance.get).toHaveBeenCalledWith('top-headlines', {});
  });

  it('handles fetch errors', async () => {
    const mockError = new Error('Network Error');
    (mockError as any).toJSON = () => ({ message: 'Network Error' });

    (axiosInstance.get as jest.Mock).mockRejectedValue(mockError);

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const store = useNewsPreviewStore.getState();
    await store.fetchTopNews();

    const state = useNewsPreviewStore.getState();
    expect(state.fetching).toBe(false);
    expect(state.fetched).toBe(true);
    expect(state.error).toBe('Network Error');
    expect(state.data).toEqual([]);

    consoleSpy.mockRestore();
  });
});
