import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import TopNewsPage from './TopNewsPage';
import * as newsActions from '../services/actions/newsActions';

// Mock the newsActions module
jest.mock('../services/actions/newsActions', () => ({
  __esModule: true,
  fetchTopNews: jest.fn(() => (dispatch: any) => {
    dispatch({ type: 'MOCK_FETCH_ACTION' });
  })
}));

const fetchTopNewsMock = newsActions.fetchTopNews as jest.MockedFunction<typeof newsActions.fetchTopNews>;

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => {
      if (key === 'Top news from World' && options?.country) {
        return `Top news from ${options.country}`;
      }
      return key;
    }
  })
}));

// Mock the Header and SmallPreviewContainer components
jest.mock('../components/Header', () => {
  return function MockHeader() {
    return <div data-testid="header">Header Component</div>;
  };
});

jest.mock('../components/SmallPreviewContainer', () => {
  return function MockSmallPreviewContainer(props: any) {
    return (
      <div data-testid="small-preview" data-url={props.url}>
        {props.title}
      </div>
    );
  };
});

const mockArticles = [
  {
    url: 'https://example.com/article1',
    title: 'Test News Article 1',
    description: 'Description of test article 1',
    urlToImage: 'https://example.com/image1.jpg',
    publishedAt: '2024-01-01T00:00:00Z',
    source: {
      name: 'Test Source 1'
    }
  },
  {
    url: 'https://example.com/article2',
    title: 'Test News Article 2',
    description: 'Description of test article 2',
    urlToImage: 'https://example.com/image2.jpg',
    publishedAt: '2024-01-02T00:00:00Z',
    source: {
      name: 'Test Source 2'
    }
  }
];

const createMockStore = (articles = [], longName = 'Great Britain', countrySelector = 'GB') => {
  let state = {
    newsPreviewReducer: { data: articles },
    newsCountrySourceReducer: {
      longName,
      data: countrySelector
    }
  };

  const reducer = (currentState = state, action: any) => {
    switch (action.type) {
      case 'SET_COUNTRY':
        return {
          ...currentState,
          newsCountrySourceReducer: {
            ...currentState.newsCountrySourceReducer,
            longName: action.payload.longName ?? currentState.newsCountrySourceReducer.longName,
            data: action.payload.countryCode ?? action.payload
          }
        };
      case 'SET_ARTICLES':
        return {
          ...currentState,
          newsPreviewReducer: {
            ...currentState.newsPreviewReducer,
            data: action.payload
          }
        };
      default:
        return currentState;
    }
  };

  const listeners = new Set<() => void>();

  const store = {
    getState: () => state,
    dispatch: (action: any) => {
      if (typeof action === 'function') {
        return action(store.dispatch, store.getState);
      }
      state = reducer(state, action);
      listeners.forEach((listener) => listener());
      return action;
    },
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  } as any;

  store.dispatch({ type: '@@INIT' });

  return store;
};

const renderWithProviders = (component: React.ReactElement, store: any) => {
  return render(
    <Provider store={store}>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

describe('TopNewsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetchTopNewsMock.mockImplementation(() => (dispatch: any) => {
      dispatch({ type: 'MOCK_FETCH_ACTION' });
    });
  });

  it('renders the header component', () => {
    const store = createMockStore();
    renderWithProviders(<TopNewsPage />, store);

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('displays the correct page title with country name', () => {
    const store = createMockStore([], 'United States');
    renderWithProviders(<TopNewsPage />, store);

    expect(screen.getByText('Top news from United States')).toBeInTheDocument();
  });

  it('dispatches fetchTopNews action on mount', async () => {
    const store = createMockStore();

    renderWithProviders(<TopNewsPage />, store);

    await waitFor(() => {
      expect(fetchTopNewsMock).toHaveBeenCalledTimes(1);
    });
  });

  it('renders articles when data is available', () => {
    const store = createMockStore(mockArticles);
    renderWithProviders(<TopNewsPage />, store);

    expect(screen.getByText('Test News Article 1')).toBeInTheDocument();
    expect(screen.getByText('Test News Article 2')).toBeInTheDocument();

    const previewComponents = screen.getAllByTestId('small-preview');
    expect(previewComponents).toHaveLength(2);
    expect(previewComponents[0]).toHaveAttribute('data-url', 'https://example.com/article1');
    expect(previewComponents[1]).toHaveAttribute('data-url', 'https://example.com/article2');
  });

  it('renders empty articles list when no data available', () => {
    const store = createMockStore([]);
    renderWithProviders(<TopNewsPage />, store);

    const previewComponents = screen.queryAllByTestId('small-preview');
    expect(previewComponents).toHaveLength(0);
  });

  it('dispatches fetchTopNews when countrySelector changes', async () => {
    const store = createMockStore();

    // First render
    renderWithProviders(<TopNewsPage />, store);
    await waitFor(() => {
      expect(fetchTopNewsMock).toHaveBeenCalledTimes(1);
    });

    act(() => {
      store.dispatch({
        type: 'SET_COUNTRY',
        payload: { countryCode: 'US', longName: 'United States' }
      });
    });

    await waitFor(() => {
      expect(fetchTopNewsMock).toHaveBeenCalledTimes(2);
      expect(screen.getByText('Top news from United States')).toBeInTheDocument();
    });
  });

  it('handles undefined articles gracefully', () => {
    const storeWithUndefinedData = createMockStore(undefined as unknown as any[], 'World', 'GB');

    renderWithProviders(<TopNewsPage />, storeWithUndefinedData);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByText('Top news from World')).toBeInTheDocument();
  });
});
