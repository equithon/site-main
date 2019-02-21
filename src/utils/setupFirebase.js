/* -------------- FIREBASE SETUP -------------- */
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { firebaseConfig } from "./siteConfig";

const curFirebaseConfig =
  process.env.NODE_ENV === "production"
    ? firebaseConfig.prod
    : firebaseConfig.dev;


class Firebase {
  constructor() {
    firebase.initializeApp(curFirebaseConfig);

    this.auth = firebase.auth();
    this.firestore = firebase.firestore();
  }

  createUser = (name, email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)
      // create corresponding doc in /users Firestore collection
      .then(userCredential => {
        this.firestore.collection('users').doc(userCredential.user.uid).set({ name, role: 'HACKER' })
      });

  signInUser = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  signOutUser = () => this.auth.signOut();

  resetPassword = email => this.auth.sendPasswordResetEmail(email);

  updatePassword = password =>
    this.auth.currentUser.updatePassword(password);
}


export default Firebase;
