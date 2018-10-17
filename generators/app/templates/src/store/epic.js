import { combineEpics } from 'redux-observable'
import { fetchUserEpic } from '../page/home/store/epic';

export default combineEpics(fetchUserEpic)
