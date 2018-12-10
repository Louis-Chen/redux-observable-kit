import { combineEpics } from 'redux-observable'
import { fetchUserEpic } from '../pages/home/store/epic';

export default combineEpics(fetchUserEpic)
