import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import '../style/foundation.scss';
import '../style/page-styles.scss';

import configureStore from '../configureStore';

const ProviderWrapper = (props) => {
  const { preloadedState, children, isDarkTheme } = props;
  const store = configureStore(preloadedState);
  return (
    <div className={`theme-${isDarkTheme ? 'dark' : 'light'}`}>
      <Provider store={store}>
        <Router>
          {children}
        </Router>
      </Provider>
    </div>
  );
};

export default ProviderWrapper;
