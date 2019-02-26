import React, { createContext, useReducer } from "react";
import Firebase from "./setupFirebase";


const siteToasts = {
  welcomeBack: {
    iconName: "lightbulb",
    backgroundColor: "primary",
    contents: "Welcome back! Everything you need as an attendee is here."
  },
  appModified: {
    iconName: "exclamation",
    backgroundColor: "warning",
    contents: "Don't forget to finish and submit your application!"
  },
  appSubmitted: {
    iconName: "check",
    backgroundColor: "green",
    contents: "Great job on finishing your application!"
  },
}


const INITIAL_CONTEXT_STATE = {
  siteTitle: "Equithon",
  firebase: new Firebase(),
  dashboardInfo: {
    greetingInfo: {
      greeting: "Hey there",
      subgreeting: "Have a great day!"
    },
    toastInfo: siteToasts.welcomeBack
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "RESET":
      return INITIAL_CONTEXT_STATE;

    case "UPDATE_TITLE":
      return {
        ...state,
        siteTitle: action.data.title
      };

    case "UPDATE_APP_REVIEW":
      return {
        ...state,
        curAppReview: action.data
      };

    case "SUBMIT_APP_REVIEW":
      return {
        ...state,
        curAppReview: "SUBMITTED"
      };

    case "UPDATE_DASHBOARD_GREETING":
      return {
        ...state,
        dashboardInfo: {
          ...state.dashboardInfo,
          greetingInfo: action.data.value
        }
      };

    case "UPDATE_DASHBOARD_TOAST":
      return {
        ...state,
        dashboardInfo: {
          ...state.dashboardInfo,
          toastInfo: siteToasts[action.data.toastName] || siteToasts.welcomeBack
        }
      }

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
