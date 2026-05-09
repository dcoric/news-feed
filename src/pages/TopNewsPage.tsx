import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import SmallPreviewContainer from '../components/SmallPreviewContainer';
import Header from '../components/Header';

import { useNewsPreviewStore, useNewsCountrySourceStore } from '../services/store';
import { Article } from '../services/types/news.types';

const TopNewsPage: React.FC = () => {
  const { t } = useTranslation();
  const fetchTopNews = useNewsPreviewStore((state) => state.fetchTopNews);
  const articles = useNewsPreviewStore((state) => state.data);
  const longNameCountry = useNewsCountrySourceStore((state) => state.longName);
  const countrySelector = useNewsCountrySourceStore((state) => state.data);
  useEffect(() => {
    fetchTopNews();
  }, [fetchTopNews, countrySelector]);

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
