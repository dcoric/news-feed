import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import './i18n';
import './style/foundation.scss';
import './style/page-styles.scss';

import configureStore from './configureStore';

import TopNewsPage from './pages/TopNewsPage';
import { TOP_NEWS_ROUTE } from './services/routes';

const NewsFeed: React.FC = () => {
  const store = configureStore();
  return (
    <div>
      <Provider store={store}>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path={TOP_NEWS_ROUTE} element={<TopNewsPage />} />
            <Route path="*" element={<Navigate to={TOP_NEWS_ROUTE} replace />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
};

export default NewsFeed;
