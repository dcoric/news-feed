import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { SmallPreviewContainer } from '../../components';

const mockProps = {
  title: 'Mock title',
  imgUrl: 'https://test-url.com/image.png',
  description: 'Mock description',
  newsId: 0
};

test('renders two loading elements', () => {
  const { getAllByText } = render(<Router><SmallPreviewContainer /></Router>);
  const loadingHeadline = getAllByText(/Loading/i);
  expect(loadingHeadline.length).toBe(2);
});

test('renders correct headline', () => {
  const { getByText } = render(<Router><SmallPreviewContainer {...mockProps} /></Router>);
  const headline = getByText(mockProps.title);
  expect(headline).toBeInTheDocument();
});

test('renders correct image', () => {
  const { getByAltText } = render(<Router><SmallPreviewContainer {...mockProps} /></Router>);
  const image = getByAltText(mockProps.title);
  expect(image.src).toBe(mockProps.imgUrl);
});
