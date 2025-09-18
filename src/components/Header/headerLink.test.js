import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HeaderLink from './headerLink';

const LINK_NAME = 'test link name';
const TEST_URL = 'test-url';
const ELEMENT_FLOAT_VALUE = 'left';
const ACTIVE_VALUE = true;
const defaultProps = {
  linkName: LINK_NAME,
  url: TEST_URL,
  float: ELEMENT_FLOAT_VALUE,
  linkCallback: jest.fn(),
  active: ACTIVE_VALUE
};

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {component}
    </BrowserRouter>
  );
};

describe('HeaderLink', () => {
  describe('With missing props', () => {
    it('renders empty div when linkName is missing', () => {
      renderWithRouter(<HeaderLink />);
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
      // When linkName is missing, no link should be rendered
      expect(screen.queryByText(LINK_NAME)).not.toBeInTheDocument();
    });
  });

  describe('With default props', () => {
    it('renders link with correct name', () => {
      renderWithRouter(<HeaderLink {...defaultProps} />);
      const link = screen.getByRole('link', { name: LINK_NAME });
      expect(link).toBeInTheDocument();
      expect(link).toHaveTextContent(LINK_NAME);
    });

    it('renders link with correct URL', () => {
      renderWithRouter(<HeaderLink {...defaultProps} />);
      const link = screen.getByRole('link', { name: LINK_NAME });
      expect(link).toHaveAttribute('href', `/${TEST_URL}`);
    });

    it('active link has active class', () => {
      renderWithRouter(<HeaderLink {...defaultProps} />);
      const container = screen.getByTestId('header-link-container');
      expect(container).toHaveClass('active');
    });

    it('inactive link does not have active class', () => {
      renderWithRouter(<HeaderLink {...defaultProps} active={false} />);
      const container = screen.getByTestId('header-link-container');
      expect(container).not.toHaveClass('active');
      expect(container).toBeInTheDocument();
    });

    it('applies correct float style', () => {
      renderWithRouter(<HeaderLink {...defaultProps} />);
      const container = screen.getByTestId('header-link-container');
      expect(container).toHaveStyle(`float: ${ELEMENT_FLOAT_VALUE}`);
    });
  });
});
