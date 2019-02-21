import React, { useContext } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';
import { Redirect } from "react-router-dom";
import { SiteContext } from "./siteContext";


// This HOC only allows access to a component (usually a view/page) if the
// user is logged in. It also passes the current user's information
// as a curUser prop for convenience.
export const accessIfAuthenticated = Component => props => {
  let AugmentedComponent;
  const { state: { firebase } } = useContext(SiteContext);
  const { initialising, user } = useAuthState(firebase.auth);
  const userLoggedIn = !initialising && (user !== null);
  const { loading, value } = useDocument(
    firebase.firestore.doc(`users/${userLoggedIn ? user.uid : 'nullUser'}`)
  );

  if(initialising || loading) {
    AugmentedComponent = <div>Loading...</div>;
  }
  else if(userLoggedIn) {
    if(value !== null) { // pass in current user's profile details
      let curUser;
      try {
        curUser = Object.assign({}, user, value.data());
      } catch(e) {
        console.log(e);
      }

      console.log(curUser);
      AugmentedComponent = <Component {...props} curUser={curUser} />

    } else {
      console.log('Unable to get user data. Please email Equithon support at hello@equithon.org');
      AugmentedComponent = <Component {...props} />
    }
  }
  else {
    AugmentedComponent = <Redirect to="/account" />;
  }


  return AugmentedComponent;
};


// This HOC only allows access to a component (usually a view/page) if the
// user is logged out.
export const accessIfNotAuthenticated = Component => props => {
  const { state: { firebase } } = useContext(SiteContext);
  const { initialising, user } = useAuthState(firebase.auth);
  const userLoggedOut = !initialising && (user === null);

  let AugmentedComponent;
  if(initialising) {
    AugmentedComponent = <div>Loading...</div>;
  }
  else if(userLoggedOut) {
    AugmentedComponent = <Component {...props} />; // do nothing, they're unauthenticated
  }
  else {
    AugmentedComponent = <Redirect to="/" />;
  }

  return AugmentedComponent;
};
