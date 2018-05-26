import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { userReducer } from '../page/home/store/reducer';

export default combineReducers({
  routing: routerReducer,
  userReducer
});
