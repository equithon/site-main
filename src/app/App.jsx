import * as React from 'react';

import { BrowserRouter as AppRouter, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { firebaseConfig, rrfConfig } from '../utils/siteConfig';
import appStore from '../ducks/store';


import AppNav from './AppNav';



/* -------------- FIREBASE SETUP -------------- */
const curFbConfig = (process.env.NODE_ENV === 'production') ? firebaseConfig.prod : firebaseConfig.dev;
firebase.initializeApp(curFbConfig);

/* -------------- REDUX SETUP -------------- */




const rrfProps = {
  firebase,
  createFirestoreInstance,
  config: rrfConfig,
  dispatch: appStore.dispatch,
};



const App = () => (
  <Provider store={appStore}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AppRouter>
        <Route component={AppNav} />
      </AppRouter>
    </ReactReduxFirebaseProvider>
  </Provider>
);

export default App;
