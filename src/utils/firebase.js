import firebase from 'firebase/app';
import { firebaseConfig } from './siteConfig';

const curFbConfig = (process.env.NODE_ENV === 'production') ? firebaseConfig.prod : firebaseConfig.dev;


class Firebase {
  constructor() {
    firebase.initializeApp(curFbConfig);
  }
}

export default Firebase;
