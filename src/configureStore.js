import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { indexOf } from 'lodash';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './services/reducers';

export default function configureStore () {
  const isDevEnvironment = process.env.NODE_ENV === 'development';
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = isDevEnvironment
    ? composeWithDevTools(applyMiddleware(...middlewares))
    : applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer, composedEnhancers);

  return store;
}
