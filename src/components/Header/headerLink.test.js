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
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('HeaderLink', () => {
  describe('With missing props', () => {
    it('renders empty div when linkName is missing', () => {
      const { container } = renderWithRouter(<HeaderLink />);
      expect(container.firstChild.tagName.toLowerCase()).toBe('div');
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
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
      const { container } = renderWithRouter(<HeaderLink {...defaultProps} />);
      expect(container.querySelector('.news-header__header-link.active')).toBeInTheDocument();
    });

    it('inactive link does not have active class', () => {
      const { container } = renderWithRouter(<HeaderLink {...defaultProps} active={false} />);
      expect(container.querySelector('.news-header__header-link.active')).not.toBeInTheDocument();
      expect(container.querySelector('.news-header__header-link')).toBeInTheDocument();
    });

    it('applies correct float style', () => {
      const { container } = renderWithRouter(<HeaderLink {...defaultProps} />);
      const headerDiv = container.querySelector('.news-header__header-link');
      expect(headerDiv).toHaveStyle(`float: ${ELEMENT_FLOAT_VALUE}`);
    });
  });
});
