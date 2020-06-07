import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import '../style/foundation.scss';
import '../style/page-styles.scss';

import configureStore from '../configureStore';

const ProviderWrapper = (props) => {
  const { preloadedState, children } = props;
  const store = configureStore(preloadedState);
  return (
    <Provider store={store}>
      <Router>
        {children}
      </Router>
    </Provider>
  );
};

export default ProviderWrapper;
