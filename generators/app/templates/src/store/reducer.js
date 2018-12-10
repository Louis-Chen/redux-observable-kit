import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import { userReducer } from '../page/home/store/reducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  appData: userReducer
});
