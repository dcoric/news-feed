import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './header';

import { useNewsCountrySourceStore } from '../../services/store/newsCountrySourceStore';
import { useNewsPreviewStore } from '../../services/store/newsPreviewStore';

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

// Mock sessionStorage
Object.defineProperty(window, 'sessionStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
  },
  writable: true,
});

const resetStores = () => {
  useNewsPreviewStore.setState({
    fetching: false,
    fetched: false,
    error: null,
    data: []
  });
  useNewsCountrySourceStore.setState({
    data: 'GB',
    longName: 'Great Britain'
  });
};

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {component}
    </BrowserRouter>
  );
};

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.history.pushState({}, '', '/');
    resetStores();
  });

  it('renders with default navigation links', () => {
    renderWithProviders(<Header />);

    expect(screen.getByRole('link', { name: 'Top news' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Categories' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Search' })).toBeInTheDocument();
  });

  it('renders with default language links', () => {
    renderWithProviders(<Header />);

    expect(screen.getByRole('link', { name: 'US' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'GB' })).toBeInTheDocument();
  });

  it('renders with custom navigation links', () => {
    const customNavigationLinks = [
      { name: 'Custom Link 1', url: '/custom1', id: 1 },
      { name: 'Custom Link 2', url: '/custom2', id: 2 }
    ];

    renderWithProviders(<Header navigationLinks={customNavigationLinks} />);

    expect(screen.getByRole('link', { name: 'Custom Link 1' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Custom Link 2' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Top news' })).not.toBeInTheDocument();
  });

  it('renders with custom language links', () => {
    const customLanguageLinks = [
      { language: 'fr-FR', name: 'France', short: 'FR' },
      { language: 'de-DE', name: 'Germany', short: 'DE' }
    ];

    renderWithProviders(<Header languageLinks={customLanguageLinks} />);

    expect(screen.getByRole('link', { name: 'FR' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'DE' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'US' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'GB' })).not.toBeInTheDocument();
  });

  it.skip('dispatches setCountryNewsSource action when language link is clicked', () => {
    renderWithProviders(<Header />);

    const usLink = screen.getByRole('link', { name: 'US' });
    fireEvent.click(usLink);
  });

  it('marks active navigation link based on current pathname', () => {
    window.history.pushState({}, '', '/top-headlines');

    renderWithProviders(<Header />);

    // Check that there is at least one active link container
    const activeContainers = screen.getAllByTestId('header-link-container');
    const hasActiveContainer = activeContainers.some(container =>
      container.classList.contains('active')
    );
    expect(hasActiveContainer).toBe(true);
  });

  it('reads country from sessionStorage', () => {
    const mockGetItem = window.sessionStorage.getItem as jest.MockedFunction<typeof window.sessionStorage.getItem>;
    mockGetItem.mockReturnValue('US');

    renderWithProviders(<Header />);

    expect(mockGetItem).toHaveBeenCalledWith('NEWS_COUNTRY');
  });
});
