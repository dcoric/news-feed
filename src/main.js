import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './i18n';
import './style/foundation.scss';
import './style/page-styles.scss';

import configureStore from './configureStore';

import TopNewsPage from './pages/TopNewsPage';
import { TOP_NEWS_ROUTE } from './services/routes';

const NewsFeed = () => {
  const store = configureStore(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path={TOP_NEWS_ROUTE}>
              <TopNewsPage />
            </Route>
            <Route>
              <Redirect to={TOP_NEWS_ROUTE} />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
};

export default NewsFeed;
