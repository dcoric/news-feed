import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import SmallPreviewContainer from '../components/SmallPreviewContainer';
import Header from '../components/Header';

import * as newsActions from '../services/actions/newsActions';

interface Article {
  url: string;
  title: string;
  description: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

const TopNewsPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const articles = useSelector((state: any) => get(state, 'newsPreviewReducer.data', []));
  const longNameCountry = useSelector((state: any) => get(state, 'newsCountrySourceReducer.longName', ''));
  const countrySelector = useSelector((state: any) => get(state, 'newsCountrySourceReducer.data'));
  useEffect(() => {
    dispatch(newsActions.fetchTopNews() as any);
  }, [dispatch, countrySelector]);

  return (
    <React.Fragment>
      <Header />
      <div className='container'>
        <div className='news-body__page-title'><h1>{t('Top news from World', { country: longNameCountry })}</h1></div>
        <div>{articles.map((article: Article) => <SmallPreviewContainer {...article} key={article.url} />)}</div>
      </div>
    </React.Fragment>
  );
};

export default TopNewsPage;
