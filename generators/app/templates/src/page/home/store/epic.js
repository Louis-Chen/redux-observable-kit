import { FETCHING_DATA } from './actionType'
import { getDataSuccess, getDataFailure } from './action'

import { Observable } from 'rxjs'

export const fetchUserEpic = action$ => {
	return action$.ofType(FETCHING_DATA).mergeMap(action =>
		Observable.ajax
			.getJSON(`http://localhost:8001/people`)
			.map(response => getDataSuccess(response))
			.catch(error => Observable.of(getDataFailure(error)))
	)
}


