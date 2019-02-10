import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const appReducer = combineReducers({ // Add firebase to reducers
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export default appReducer;
