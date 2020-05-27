/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './small-preview-container.scss';
import { URLGenerator } from '../../services/utils/urlGenerator';
import { READ_MORE_ROUT } from '../../services/routes';
import { NEWS_ID } from '../../services/constants';

const SmallPreviewContainer = (props) => {
  const {
    title, urlToImage, content, url, publishedAt
  } = props;
  // const readMoreUrl = new URLGenerator(READ_MORE_ROUT);
  return (
    <div className='news-preview__container'>
      <div className='news-preview__title'>
        <h2>{title}</h2>
      </div>
      <div className='news-preview__image-preview'>
        <img alt={title} src={urlToImage} />
      </div>
      <div className='news-preview__decription'>
        {content}
      </div>
      <hr className='news-preview__read-more-line' />
      <div className='news-preview__read-more-link'>
        <a href={url} target='_blank'>Read more...</a>
      </div>
    </div>
  );
};

export default SmallPreviewContainer;

SmallPreviewContainer.defaultProps = {
  title: 'Loading news...',
  urlToImage: '',
  content: '',
  url: '',
  publishedAt: ''
};

SmallPreviewContainer.propTypes = {
  title: PropTypes.string.isRequired,
  urlToImage: PropTypes.string,
  content: PropTypes.string,
  url: PropTypes.string,
  publishedAt: PropTypes.string || PropTypes.date
};
