/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './small-preview-container.scss';
import { URLGenerator } from '../../services/utils/urlGenerator';
import { READ_MORE_ROUT } from '../../services/routes';
import { NEWS_ID } from '../../services/constants';

const SmallPreviewContainer = ({
  title = 'Loading news...',
  urlToImage = '',
  content = '',
  url = '',
  publishedAt = ''
}) => {
  // const readMoreUrl = new URLGenerator(READ_MORE_ROUT);
  return (
    <div className='news-preview__container' data-testid="news-preview-container">
      <div className='news-preview__title' data-testid="news-preview-title">
        <h2>{title}</h2>
      </div>
      <div className='news-preview__image-preview' data-testid="news-preview-image">
        <img alt={title} src={urlToImage} />
      </div>
      <div className='news-preview__decription' data-testid="news-preview-description">
        {content}
      </div>
      <hr className='news-preview__read-more-line' data-testid="news-preview-read-more-line" />
      <div className='news-preview__read-more-link' data-testid="news-preview-read-more-link">
        <a href={url} target='_blank'>Read more...</a>
      </div>
    </div>
  );
};

SmallPreviewContainer.propTypes = {
  title: PropTypes.string,
  urlToImage: PropTypes.string,
  content: PropTypes.string,
  url: PropTypes.string,
  publishedAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
};

export default SmallPreviewContainer;
