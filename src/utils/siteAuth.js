import React, { useContext } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';
import { Redirect } from "react-router-dom";
import SiteContext from "./siteContext";
import PageLoadingView from "../app/views/loading/PageLoadingContainer";

// This HOC grabs the additional user info in the /users collection in Firestore
// and populates the curUser prop in the component with the info.
export const withCurUserInfo = Component => props => {
  const { state: { firebase } } = useContext(SiteContext);
  const { initialising, user } = useAuthState(firebase.auth);
  const { loading, value } = useDocument(
    firebase && firebase.firestore.doc(`users/${user && user.uid}`)
  );

  if(loading || initialising) return <PageLoadingView />;

  if(props.redirect) return Component;

  if(value === null || !value.exists) { // pass in current user's profile details
    // console.log('Unable to get user data. Please email Equithon support at hello@equithon.org');
    return <Component {...props} />;
  }

  try {
    const curUser = Object.assign({}, user, value.data());
    return <Component {...props} curUser={curUser} />

  } catch(e) {
    console.log(e);
    return <Component {...props} />;
  }

}


// This HOC only allows access to a component (usually a view/page) if the
// user is logged in. It also passes the current user's information
// as a curUser prop for convenience.
export const accessIfAuthenticated = Component => props => {
  let AugmentedComponent;
  const { state: { firebase } } = useContext(SiteContext);
  const { initialising, user } = useAuthState(firebase.auth);
  const userLoggedIn = !initialising && (user !== null);

  if(initialising) {
    AugmentedComponent = withCurUserInfo(<PageLoadingView />)({});
  }
  else if(userLoggedIn) {
    AugmentedComponent = withCurUserInfo(Component)(props);
  }
  else {
    AugmentedComponent = withCurUserInfo(<Redirect to="/account" />)({ redirect: true });
  }


  return AugmentedComponent;
};


// This HOC only allows access to a component (usually a view/page) if the
// user is logged out.
export const accessIfNotAuthenticated = Component => props => {
  let AugmentedComponent;
  const { state: { firebase } } = useContext(SiteContext);
  const { initialising, user } = useAuthState(firebase.auth);
  const userLoggedOut = !initialising && (user === null);

  if(initialising) {
    AugmentedComponent = <PageLoadingView />;
  }
  else if(userLoggedOut) {
    AugmentedComponent = <Component {...props} />; // do nothing, they're unauthenticated
  }
  else {
    AugmentedComponent = <Redirect to="/" />;
  }

  return AugmentedComponent;
};
