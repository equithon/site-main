import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";
import createHistory from "history/createBrowserHistory";

const locationHelper = locationHelperBuilder({});
const browserHistory = createHistory();

export const UserIsAuthenticated = connectedRouterRedirect({
  wrapperDisplayName: "UserIsAuthenticated",
  allowRedirectBack: true,
  redirectPath: (state, ownProps) => {
    console.log(
      state,
      ownProps,
      locationHelper.getRedirectQueryParam(ownProps)
    );
    return locationHelper.getRedirectQueryParam(ownProps) || "/account";
  },
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing === true,
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth.isLoaded && !auth.isEmpty,
  redirectAction: newLoc => dispatch => {
    browserHistory.replace(newLoc);
    dispatch({ type: "UNAUTHED_REDIRECT" });
  }
});

export const UserIsNotAuthenticated = connectedRouterRedirect({
  wrapperDisplayName: "UserIsNotAuthenticated",
  allowRedirectBack: false,
  redirectPath: (state, ownProps) => {
    console.log(locationHelper.getRedirectQueryParam(ownProps) || "/");
    return locationHelper.getRedirectQueryParam(ownProps) || "/";
  },
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing === true,
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth.isLoaded && auth.isEmpty,
  redirectAction: newLoc => dispatch => {
    browserHistory.replace(newLoc);
    dispatch({ type: "UNAUTHED_REDIRECT" });
  }
});
