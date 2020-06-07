import React from 'react';
import Header from '../../components/Header';
import ProviderWrapper from '../ProviderWrapper';

export default {
  title: 'Header',
  component: Header
};

export const LightHeader = () => <ProviderWrapper><Header /></ProviderWrapper>;

LightHeader.story = {
  name: 'Light Header'
};
