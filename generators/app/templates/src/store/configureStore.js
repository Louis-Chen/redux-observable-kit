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

/**
 * localStorge
 */

import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'


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

/**
 * redux-persist
 */

// const persistConfig = {
// 	key: 'root',
// 	storage: storage,
// 	stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
// 	whitelist: ['cart']
// }


const epicMiddleware = createEpicMiddleware();

export const history = createBrowserHistory();

// const persistedReducer = persistReducer(persistConfig, rootReducer(history))

const initialState = {};
const enhancers = [];
const middleware = [routerMiddleware(history), epicMiddleware];
// firebase
// const middleware = [routerMiddleware(history), thunk.withExtraArgument(getFirebase), epicMiddleware]

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

/**
 * firebase / persitor
 */
// export const store = createStoreWithFirebase(
// 	persistedReducer, // root reducer with router state
// 	initialState,
// 	composedEnhancers
// )
// export const persistor = persistStore(store)
