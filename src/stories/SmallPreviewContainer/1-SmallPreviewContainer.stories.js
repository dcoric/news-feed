import React from 'react';
import SmallPreviewContainer from '../../components/SmallPreviewContainer';
import ProviderWrapper from '../ProviderWrapper';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

export default {
  title: 'Small Preview Container',
  component: SmallPreviewContainer,
  decorators: [withKnobs]
};

export const SmallPreviewContainerLoading = () => <ProviderWrapper isDarkTheme={boolean('Dark Theme', false)}><SmallPreviewContainer /></ProviderWrapper>;

export const SmallPreviewContainerLoaded = () => {
  const exampleNews = {
    source: {
      id: null,
      name: 'Mirror Online'
    },
    author: 'Molly Pike',
    title: text('Title', 'Piers Morgan queues up for McDonald\'s after moaning about lockdown weight gain - Mirror Online'),
    description: text('Description', 'Piers Morgan queued up for a McDonald\'s on Sunday after branches across the country reopened earlier this week'),
    url: text('URL', 'https://www.mirror.co.uk/3am/celebrity-news/piers-morgan-queues-up-mcdonalds-22153707'),
    urlToImage: 'https://i2-prod.mirror.co.uk/incoming/article22145884.ece/ALTERNATES/s1200/0_Piers-Morgan-confirms-he-is-returning-to-Good-Morning-Britain-on-Monday-to-ask-hard-questions.jpg',
    publishedAt: '2020-06-07T20:34:43Z',
    content: 'Piers Morgan may have moaned about putting on weight during the coronavirus lockdown, but that didn\'t stop him from enjoying some junk food at the first opportunity. \r\nThe Good Morning Britain host, … [+1474 chars]'
  };
  return (
    <ProviderWrapper isDarkTheme={boolean('Dark Theme', false)}>
      <SmallPreviewContainer
        {...exampleNews}
      />
    </ProviderWrapper>
  );
};

SmallPreviewContainerLoading.story = {
  name: 'News is Loading...'
};

SmallPreviewContainerLoaded.story = {
  name: 'News is Loaded'
};
