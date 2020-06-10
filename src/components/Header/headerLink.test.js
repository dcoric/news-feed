import React from 'react';
import { shallow } from 'enzyme';
import HeaderLink from './headerLink';

const LINK_NAME = 'test link name';
const TEST_URL = 'test-url';
const ELEMENT_FLOAT_VALUE = 'left';
const ACTIVE_VALUE = true;
const defaultProps = {
  linkName: LINK_NAME,
  url: TEST_URL,
  float: ELEMENT_FLOAT_VALUE,
  linkCallback: () => {},
  active: ACTIVE_VALUE
};

const headerLink = shallow(<HeaderLink />);
describe('HeaderLink', () => {
  describe('Rendering snapshot', () => {
    it('renders correctly', () => {
      expect(headerLink).toMatchSnapshot();
    });
  });

  describe('With missing props', () => {
    it('renders empty div when props are missing', () => {
      expect(headerLink.find('Link').exists()).toBe(false);
    });
  });

  describe('With default props', () => {
    beforeEach(() => {
      headerLink.setProps(defaultProps);
    });

    it('it shows correct `link name`', () => {
      expect(headerLink.find('Link.news-header__header-link').text()).toEqual(LINK_NAME);
    });

    it('it shows correct `link URL`', () => {
      expect(headerLink.find('Link.news-header__header-link').prop('to')).toEqual(TEST_URL);
    });

    it('active link has `active` class', () => {
      expect(headerLink.find('div.news-header__header-link.active').exists()).toBe(true);
    });

    it('inactive link does not have `active` class', () => {
      headerLink.setProps({ ...defaultProps, active: false });
      expect(headerLink.find('div.news-header__header-link.active').exists()).toBe(false);
    });
  });
});
