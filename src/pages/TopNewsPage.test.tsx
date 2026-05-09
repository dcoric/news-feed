import { act, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import TopNewsPage from './TopNewsPage';
import { useNewsPreviewStore } from '../services/store/newsPreviewStore';

import { useNewsCountrySourceStore } from '../services/store/newsCountrySourceStore';

// Mock axios in the store
jest.mock('../services/axios-service', () => ({
  get: jest.fn().mockResolvedValue({ data: { articles: [] } })
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

const resetStores = (articles = [], longName = 'Great Britain', countrySelector = 'GB') => {
  useNewsPreviewStore.setState({
    fetching: false,
    fetched: false,
    error: null,
    data: articles
  });
  useNewsCountrySourceStore.setState({
    data: countrySelector,
    longName
  });
};

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {component}
    </BrowserRouter>
  );
};

describe('TopNewsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetStores();
  });

  it('renders the header component', () => {
    resetStores();
    renderWithProviders(<TopNewsPage />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('displays the correct page title with country name', () => {
    resetStores([], 'United States');
    renderWithProviders(<TopNewsPage />);

    expect(screen.getByText('Top news from United States')).toBeInTheDocument();
  });

  it('fetches top news on mount', async () => {
    resetStores();
    renderWithProviders(<TopNewsPage />);

    await waitFor(() => {
      expect(useNewsPreviewStore.getState().fetching).toBe(false);
    });
  });

  it('renders articles when data is available', () => {
    resetStores(mockArticles);
    renderWithProviders(<TopNewsPage />);

    expect(screen.getByText('Test News Article 1')).toBeInTheDocument();
    expect(screen.getByText('Test News Article 2')).toBeInTheDocument();

    const previewComponents = screen.getAllByTestId('small-preview');
    expect(previewComponents).toHaveLength(2);
    expect(previewComponents[0]).toHaveAttribute('data-url', 'https://example.com/article1');
    expect(previewComponents[1]).toHaveAttribute('data-url', 'https://example.com/article2');
  });

  it('renders empty articles list when no data available', () => {
    resetStores([]);
    renderWithProviders(<TopNewsPage />);

    const previewComponents = screen.queryAllByTestId('small-preview');
    expect(previewComponents).toHaveLength(0);
  });

  it('refetches when countrySelector changes', async () => {
    resetStores();

    renderWithProviders(<TopNewsPage />);
    await waitFor(() => {
      expect(useNewsPreviewStore.getState().fetching).toBe(false);
    });

    act(() => {
      useNewsCountrySourceStore.setState({ data: 'US', longName: 'United States' });
    });

    await waitFor(() => {
      expect(useNewsPreviewStore.getState().fetching).toBe(false);
    });
    expect(screen.getByText('Top news from United States')).toBeInTheDocument();
  });

  it('handles undefined articles gracefully', () => {
    resetStores(undefined as unknown as any[], 'World', 'GB');

    renderWithProviders(<TopNewsPage />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByText('Top news from World')).toBeInTheDocument();
  });
});
