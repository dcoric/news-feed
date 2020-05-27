import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import SmallPreviewContainer from '../components/SmallPreviewContainer';
import Header from '../components/Header';

import * as newsActions from '../services/actions/newsActions';

const TopNewsPage = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const articles = useSelector(state => get(state, 'newsPreviewReducer.data', []));
  const longNameCountry = useSelector(state => get(state, 'newsCountrySourceReducer.longName', []));
  const countrySelector = useSelector(state => get(state, 'newsCountrySourceReducer.data'));
  useEffect(() => {
    dispatch(newsActions.fetchTopNews());
  }, [dispatch, countrySelector]);

  return (
    <React.Fragment>
      <Header />
      <div className='container'>
        <div className='news-body__page-title'><h1>{t('Top news from World', { country: longNameCountry })}</h1></div>
        <div>{articles.map(article => <SmallPreviewContainer {...article} key={article.url} />)}</div>
      </div>
    </React.Fragment>
  );
};

export default TopNewsPage;
