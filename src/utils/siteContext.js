import React, { createContext, useReducer } from "react";
import Firebase from "./setupFirebase";

const INITIAL_CONTEXT_STATE = {
  firebase: new Firebase(),
  dashboardInfo: {
    greetingInfo: {
      greeting: "Hey there",
      subgreeting: "Have a great day!"
    },
    toastInfo: {
      iconName: "lightbulb",
      backgroundColor: "primary",
      contents: "Welcome back! Everything you need as an attendee is here."
    }
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "RESET":
      return INITIAL_CONTEXT_STATE;

    case "UPDATE_HACKER_APPLICATION":
      return {
        ...state,
        curAppInfo: action.data
      };

    case "UPDATE_DASHBOARD_GREETING":
      return {
        ...state,
        dashboardInfo: {
          ...state.dashboardInfo,
          greetingInfo: action.data.value
        }
      };

    default:
      return state;
  }
};

const SiteContext = createContext();

export const SiteContextConsumer = SiteContext.Consumer;

export const SiteContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_CONTEXT_STATE);
  const value = { state, dispatch };

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
};


// maps state in site context store to props that the component will receive
export const connectSiteContext = (
  mapContextStateToProps = data => data
) => Component => props => (
  <SiteContextConsumer>
    {data => <Component {...mapContextStateToProps(data)} {...props} />}
  </SiteContextConsumer>
);

export default SiteContext;
