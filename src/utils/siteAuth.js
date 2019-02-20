import React, { useContext } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { Redirect } from "react-router-dom";
import { SiteContext } from "./siteContext";


const ProtectedAuth = ({ children }) => {
  const { state: { firebase } } = useContext(SiteContext);
  const { initialising, user } = useAuthState(firebase.auth);

  if(initialising) {
    return <div>Loading...</div>;
  } else if(user !== null) {
    return children;
  }

  return <Redirect to="/account" />;
}

export const accessIfAuthenticated = (Component) => props => {
  return (
    <ProtectedAuth>
      <Component {...props} />
    </ProtectedAuth>
  )
};


export const ProtectedUnauth = ({ children }) => {
  const { state: { firebase } } = useContext(SiteContext);
  const { initialising, user } = useAuthState(firebase.auth);

  if(initialising) {
    return <div>Loading...</div>;
  } else if(user === null) {
    return children;
  }

  return <Redirect to="/" />;
}


export const accessIfNotAuthenticated = (Component) => props => (
  <ProtectedUnauth>
    <Component {...props} />
  </ProtectedUnauth>
);
