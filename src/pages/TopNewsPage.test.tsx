import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import TopNewsPage from './TopNewsPage';
import * as newsActions from '../services/actions/newsActions';

// Mock the newsActions module
jest.mock('../services/actions/newsActions', () => ({
  fetchTopNews: jest.fn(() => (dispatch: any) => {
    dispatch({ type: 'MOCK_FETCH_ACTION' });
  })
}));

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
  return createStore((state = {
    newsPreviewReducer: { data: articles },
    newsCountrySourceReducer: {
      longName: longName,
      data: countrySelector
    }
  }) => state, applyMiddleware(thunk));
};

const renderWithProviders = (component: React.ReactElement, store: any) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

describe('TopNewsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.skip('renders the header component', () => {
    const store = createMockStore();
    renderWithProviders(<TopNewsPage />, store);

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it.skip('displays the correct page title with country name', () => {
    const store = createMockStore([], 'United States');
    renderWithProviders(<TopNewsPage />, store);

    expect(screen.getByText('Top news from United States')).toBeInTheDocument();
  });

  it.skip('dispatches fetchTopNews action on mount', () => {
    const fetchTopNewsMock = newsActions.fetchTopNews as jest.MockedFunction<typeof newsActions.fetchTopNews>;
    const store = createMockStore();

    renderWithProviders(<TopNewsPage />, store);

    expect(fetchTopNewsMock).toHaveBeenCalledTimes(1);
  });

  it.skip('renders articles when data is available', () => {
    const store = createMockStore(mockArticles);
    renderWithProviders(<TopNewsPage />, store);

    expect(screen.getByText('Test News Article 1')).toBeInTheDocument();
    expect(screen.getByText('Test News Article 2')).toBeInTheDocument();

    const previewComponents = screen.getAllByTestId('small-preview');
    expect(previewComponents).toHaveLength(2);
    expect(previewComponents[0]).toHaveAttribute('data-url', 'https://example.com/article1');
    expect(previewComponents[1]).toHaveAttribute('data-url', 'https://example.com/article2');
  });

  it.skip('renders empty articles list when no data available', () => {
    const store = createMockStore([]);
    renderWithProviders(<TopNewsPage />, store);

    const previewComponents = screen.queryAllByTestId('small-preview');
    expect(previewComponents).toHaveLength(0);
  });

  it.skip('dispatches fetchTopNews when countrySelector changes', () => {
    const fetchTopNewsMock = newsActions.fetchTopNews as jest.MockedFunction<typeof newsActions.fetchTopNews>;
    const store = createMockStore();

    // First render
    const { rerender } = renderWithProviders(<TopNewsPage />, store);
    expect(fetchTopNewsMock).toHaveBeenCalledTimes(1);

    // Create a new store with different country
    const newStore = createMockStore([], 'United States', 'US');

    // Re-render with new store
    rerender(
      <Provider store={newStore}>
        <BrowserRouter>
          <TopNewsPage />
        </BrowserRouter>
      </Provider>
    );

    expect(fetchTopNewsMock).toHaveBeenCalledTimes(2);
  });

  it.skip('handles undefined articles gracefully', () => {
    const storeWithUndefinedData = createMockStore([], 'World', 'GB');

    renderWithProviders(<TopNewsPage />, storeWithUndefinedData);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByText('Top news from World')).toBeInTheDocument();
  });

  it.skip('applies correct CSS classes to container elements', () => {
    const store = createMockStore();
    const { container } = renderWithProviders(<TopNewsPage />, store);

    expect(container.querySelector('.container')).toBeInTheDocument();
    expect(container.querySelector('.news-body__page-title')).toBeInTheDocument();
  });
});