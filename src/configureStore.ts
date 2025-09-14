import { applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk';

import rootReducer from './services/reducers';

export default function configureStore (preloadedState?: any) {
  const middlewareEnhancer = applyMiddleware(thunk);

  if (preloadedState) {
    return createStore(rootReducer, preloadedState, middlewareEnhancer);
  }
  return createStore(rootReducer, middlewareEnhancer);
}
