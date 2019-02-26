/* -------------- FIREBASE SETUP -------------- */
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// config for Firebase (keys stored in gitignored .env file)
const firebaseConfig = {
  dev: {
    apiKey: process.env.REACT_APP_DEV_API_KEY,
    authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
    projectId: process.env.REACT_APP_DEV_PROJECT_ID,
    storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID
  },
  prod: {
    apiKey: process.env.REACT_APP_PROD_API_KEY,
    authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
    projectId: process.env.REACT_APP_PROD_PROJECT_ID,
    storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID
  }
};


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

  // Create a new user with an email and password, and create a corresponding
  // document in the /users Firestore collection with their name and role
  createUser = (name, email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)
      // create corresponding doc in /users Firestore collection
      .then(userCredential => {
        try {
          this.firestore.collection('users').doc(userCredential.user.uid).set({ name, role: 'HACKER' });
        } catch(e) {
          console.log(e);
        }
      });

  // Sign in a user using an email and password
  signInUser = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  // Sign out the current user, if one is signed in
  signOutUser = () => this.auth.signOut();


  // Update the name of the user in the /users collection with the specified userId
  updateUserName = (userId, updatedName) => {
    try {
      this.firestore.collection('users').doc(userId).update({ name: updatedName });
    } catch(e) {
      console.log(e);
    }
  }

  // Update the password of the current user
  updatePassword = password =>
    this.auth.currentUser.updatePassword(password);

  // Request a password reset email for the current user
  resetPassword = email => this.auth.sendPasswordResetEmail(email);

  getTimestamp = date => firebase.firestore.Timestamp.fromDate(date);

}


export default Firebase;
