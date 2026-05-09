import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import './i18n';
import './style/main.scss';

import TopNewsPage from './pages/TopNewsPage';
import { TOP_NEWS_ROUTE } from './services/routes';

const NewsFeed: React.FC = () => {
  return (
    <div>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path={TOP_NEWS_ROUTE} element={<TopNewsPage />} />
          <Route path="*" element={<Navigate to={TOP_NEWS_ROUTE} replace />} />
        </Routes>
      </Router>
    </div>
  );
};

export default NewsFeed;
