/* -------------- FIREBASE SETUP -------------- */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { createFirestoreInstance } from 'redux-firestore';

import { firebaseConfig, rrfConfig } from './siteConfig';
import appStore from '../ducks/store';


const curFirebaseConfig = (process.env.NODE_ENV === 'production') ? firebaseConfig.prod : firebaseConfig.dev;
firebase.initializeApp(curFirebaseConfig);

const reactReduxFirebase = {
  firebase,
  createFirestoreInstance,
  config: rrfConfig,
  dispatch: appStore.dispatch,
};

export default reactReduxFirebase;
