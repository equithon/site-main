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
// user is logged in AND has an specific role. It also passes the
// current user's information as a curUser prop for convenience.
export const accessIfRole = permittedRoles => Component => props => {
  let AugmentedComponent;
  let curUser;
  const { state: { firebase } } = useContext(SiteContext);
  const { initialising, user } = useAuthState(firebase.auth);
  const { loading, value } = useDocument(
    firebase && firebase.firestore.doc(`users/${user && user.uid}`)
  );

  try {
     curUser = Object.assign({}, user, value && value.data());
  } catch(e) {
    console.log(e);
  }

  const userHasPermission = !initialising && !loading && (user !== undefined) && value && (curUser.role === permittedRoles || (Array.isArray(permittedRoles) && permittedRoles.includes(curUser.role)));

  if(initialising || loading) {
    AugmentedComponent = <PageLoadingView />;
  }
  else if(userHasPermission) {
    AugmentedComponent = <Component {...props} curUser={curUser} />
  }
  else {
    console.warn("Whoops! You don't have permission to view this page. If this is an error or a bug, please email alex@equithon.org.")
    AugmentedComponent = <Redirect to="/" />;
  }


  return AugmentedComponent;
};


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
    console.warn("Whoops! You're not logged in. If this is an error or a bug, please email alex@equithon.org.")
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
    console.warn("Whoops! You're logged in, so you can't view this page. If this is an error or a bug, please email alex@equithon.org.")
    AugmentedComponent = <Redirect to="/" />;
  }

  return AugmentedComponent;
};
