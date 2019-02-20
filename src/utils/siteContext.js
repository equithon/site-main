import React, { createContext, useReducer } from "react";
import Firebase from "./setupFirebase";

const INITIAL_CONTEXT_STATE = {
  firebase: new Firebase(),

};


const reducer = (state, action) => {
  switch (action.type) {
    case 'reset':
      return INITIAL_CONTEXT_STATE;

    default:
      return state;
  }
};


export const SiteContext = createContext();

export const SiteContextConsumer = SiteContext.Consumer;

// maps data in site context store to props that the component will receive
export const connectSiteContext = (
  mapContextToProps = data => data
) => Component => props => (
  <SiteContextConsumer>
      {data => <Component {...mapContextToProps(data)} {...props} />}
  </SiteContextConsumer>
);


const SiteContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_CONTEXT_STATE);
  const value = { state, dispatch };

  return (
    <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
  );
}

export default SiteContextProvider;
