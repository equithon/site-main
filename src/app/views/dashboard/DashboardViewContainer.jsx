import { connect } from "react-redux";
import { withFirebase } from "react-redux-firebase";
import { compose, withHandlers, withProps } from "recompose";

import { UserIsAuthenticated } from "../../../utils/siteAuth";
import * as ROUTES from "../../../utils/siteRoutes";
import DashboardViewComponent from "./DashboardViewComponent";

const dashboardTiles = {
  schedule: {
    label: "Event Schedule",
    linkTo: ROUTES.SCHEDULE,
    backgroundImg: "SOMEIMPORTEDIMAGE"
  },
  map: {
    label: "Event Schedule",
    linkTo: ROUTES.MAP,
    backgroundImg: "SOMEIMPORTEDIMAGE"
  },
  app_review: {
    label: "Application Review",
    linkTo: ROUTES.APP_REVIEW,
    backgroundColor: "#e3a368"
  },
  attendee_list_volunteer: {
    label: "Check In Tool",
    linkTo: { pathname: ROUTES.ATTENDEE_LIST, state: { as: "VOLUNTEER" } },
    backgroundColor: "#bb7cc1"
  },
  attendee_list_organizer: {
    label: "Attendee List",
    linkTo: { pathname: ROUTES.ATTENDEE_LIST, state: { as: "ORGANIZER" } },
    backgroundColor: "#bb7cc1"
  },
  profile: {
    label: "Event Schedule",
    linkTo: { pathname: ROUTES.PROFILE, state: { modal: true, onTopOf: "/" } },
    backgroundColor: "#1ec77a"
  }
};

const userDashboards = {
  HACKER: [{ value: 20, ...dashboardTiles.map }],
  ORGANIZER: [],
  VOLUNTEER: [],
  JUDGE: [],
  GENERAL: []
};

const enhance = compose(
  connect(state => ({
    curUserProfile: state.firebase.profile // profile passed as props.profile
  })),
  withFirebase,
  withHandlers({
    logOutUser: props => () => props.firebase.logout()
  }),
  withProps({
    userDashboards
  }),
  UserIsAuthenticated
);

export default enhance(DashboardViewComponent);
