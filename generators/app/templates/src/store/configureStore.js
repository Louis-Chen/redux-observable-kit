import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
import { createBrowserHistory } from 'history';

import rootReducer from './reducer';
import rootEpic from './epic';

const epicMiddleware = createEpicMiddleware(rootEpic);

export const history = createBrowserHistory();

const initialState = {};
const enhancers = [];
const middleware = [routerMiddleware(history), epicMiddleware];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;
  middleware.push(createLogger());
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(rootReducer(history), initialState, composedEnhancers);

export default store;
