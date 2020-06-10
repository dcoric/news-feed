import React from 'react';
import { shallow } from 'enzyme';
import { SmallPreviewContainer } from '../index';

const smallPreviewContainer = shallow(<SmallPreviewContainer />);

describe('SmallPreviewContainer', () => {
  describe('Rendering snapshot', () => {
    it('renders correctly', () => {
      expect(smallPreviewContainer).toMatchSnapshot();
    });
  });
});
