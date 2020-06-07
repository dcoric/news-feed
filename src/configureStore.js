import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './services/reducers';

export default function configureStore (preloadedState) {
  const isDevEnvironment = process.env.NODE_ENV === 'development';
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = isDevEnvironment
    ? composeWithDevTools(applyMiddleware(...middlewares))
    : applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);
  if (preloadedState) return createStore(rootReducer, preloadedState, composedEnhancers);
  return createStore(rootReducer, composedEnhancers);
}
