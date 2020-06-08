import React from 'react';
import Header from '../../components/Header';
import ProviderWrapper from '../ProviderWrapper';
import { withKnobs, boolean } from '@storybook/addon-knobs';

export default {
  title: 'Header',
  component: Header,
  decorators: [withKnobs]
};

export const LightHeader = () => <ProviderWrapper isDarkTheme={boolean('Dark Theme', false)}><Header /></ProviderWrapper>;

LightHeader.story = {
  name: 'Light Header'
};
