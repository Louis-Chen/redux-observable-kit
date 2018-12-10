import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
import { createBrowserHistory } from 'history';

/**
 * firebase
 */

import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import { reduxFirestore } from 'redux-firestore'
import firebase from 'firebase'
import 'firebase/firestore' // <- needed if using firestore

import rootReducer from './reducer';
import rootEpic from './epic';

/**
 * react-redux-firebase
 */

// const firebaseConfig = {

// }
// firebase.initializeApp(firebaseConfig)
// firebase.firestore().settings({ timestampsInSnapshots: true })

// const reactReduxFirebaseConfig = {
// 	userProfile: 'users', // firebase root where user profiles are stored
// 	// enableLogging: true, // enable/disable Firebase's database logging
// 	attachAuthIsReady: true, // attaches auth is ready promise to store,
// 	fileMetadataFactory: uploadRes => {
// 		// upload response from Firebase's storage upload
// 		const {
// 			metadata: { name, fullPath, downloadURLs }
// 		} = uploadRes
// 		// default factory includes name, fullPath, downloadURL
// 		return {
// 			name,
// 			fullPath,
// 			downloadURL: downloadURLs[0]
// 		}
// 	}
// }

// const createStoreWithFirebase = compose(
// 	reactReduxFirebase(firebase, reactReduxFirebaseConfig), // firebase instance as first argument
// 	reduxFirestore(firebase) // <- needed if using firestore
// )(createStore)

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
  // reactReduxFirebase(firebase, reactReduxFirebaseConfig),
	// reduxFirestore(firebase),
  applyMiddleware(...middleware),
  ...enhancers
);

epicMiddleware.run(rootEpic);

export const store = createStore(rootReducer(history), initialState, composedEnhancers);
