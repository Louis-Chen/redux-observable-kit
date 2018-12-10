import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
import { createBrowserHistory } from 'history';

import rootReducer from './reducer';
import rootEpic from './epic';

const epicMiddleware = createEpicMiddleware();

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

epicMiddleware.run(rootEpic);

export const store = createStore(rootReducer(history), initialState, composedEnhancers);
