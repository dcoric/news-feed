import React from 'react';
import { render, screen } from '@testing-library/react';
import SmallPreviewContainer from './smallPreviewContainer';

const defaultProps = {
  title: 'Test News Title',
  urlToImage: 'https://example.com/image.jpg',
  content: 'This is test news content for testing purposes.',
  url: 'https://example.com/full-article',
  publishedAt: '2024-01-01T00:00:00Z'
};

describe('SmallPreviewContainer', () => {
  it('renders with default loading state when no props provided', () => {
    render(<SmallPreviewContainer />);
    expect(screen.getByText('Loading news...')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Read more...' })).toBeInTheDocument();
  });

  it('renders all provided content correctly', () => {
    render(<SmallPreviewContainer {...defaultProps} />);

    expect(screen.getByRole('heading', { name: defaultProps.title })).toBeInTheDocument();
    expect(screen.getByText(defaultProps.content)).toBeInTheDocument();

    const image = screen.getByRole('img', { name: defaultProps.title });
    expect(image).toHaveAttribute('src', defaultProps.urlToImage);
    expect(image).toHaveAttribute('alt', defaultProps.title);

    const readMoreLink = screen.getByRole('link', { name: 'Read more...' });
    expect(readMoreLink).toHaveAttribute('href', defaultProps.url);
    expect(readMoreLink).toHaveAttribute('target', '_blank');
  });

  it('renders with partial props', () => {
    const partialProps = {
      title: 'Partial Title',
      content: 'Partial content'
    };

    render(<SmallPreviewContainer {...partialProps} />);

    expect(screen.getByRole('heading', { name: partialProps.title })).toBeInTheDocument();
    expect(screen.getByText(partialProps.content)).toBeInTheDocument();

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '');

    const readMoreLink = screen.getByRole('link', { name: 'Read more...' });
    expect(readMoreLink).toHaveAttribute('href', '');
  });

  it('has correct CSS classes', () => {
    render(<SmallPreviewContainer {...defaultProps} />);

    expect(screen.getByTestId('news-preview-container')).toBeInTheDocument();
    expect(screen.getByTestId('news-preview-title')).toBeInTheDocument();
    expect(screen.getByTestId('news-preview-image')).toBeInTheDocument();
    expect(screen.getByTestId('news-preview-description')).toBeInTheDocument();
    expect(screen.getByTestId('news-preview-read-more-line')).toBeInTheDocument();
    expect(screen.getByTestId('news-preview-read-more-link')).toBeInTheDocument();
  });
});
