import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import { userReducer } from '../pages/home/store/reducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  user: userReducer
});
