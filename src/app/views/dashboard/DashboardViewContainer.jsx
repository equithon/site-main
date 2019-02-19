import { connect } from "react-redux";
import { withFirebase } from "react-redux-firebase";
import { compose, withHandlers, withProps } from "recompose";

import { UserIsAuthenticated } from "../../../utils/siteAuth";
import * as ROUTES from "../../../utils/siteRoutes";
import DashboardViewComponent from "./DashboardViewComponent";

import MapTileBG from "../../../static/img/dashboard/tiles/map.png";
import CalendarTileBG from "../../../static/img/dashboard/tiles/schedule.png";
import ApplicationTileBG from "../../../static/img/dashboard/tiles/application.png";

const dashboardTiles = {
  schedule: {
    label: "Event Schedule",
    linkTo: ROUTES.SCHEDULE,
    gridArea: "leftTop",
    backgroundImg: CalendarTileBG
  },
  map: {
    label: "Event Map",
    linkTo: ROUTES.MAP,
    gridArea: "leftBot",
    backgroundImg: MapTileBG,
    color: "black"
  },
  application: {
    label: "My Application",
    linkTo: ROUTES.APPLICATION,
    gridArea: "centerTop",
    backgroundImg: ApplicationTileBG
  },
  app_review: {
    label: "Application Review",
    linkTo: ROUTES.APP_REVIEW,
    gridArea: "centerTop",
    backgroundColor: "#e3a368"
  },
  attendee_list_volunteer: {
    label: "Check In Tool",
    linkTo: ROUTES.ATTENDEE_LIST_VOLUNTEER,
    gridArea: "rightTop",
    backgroundColor: "#66ADEF"
  },
  attendee_list_organizer: {
    label: "Attendee List",
    linkTo: ROUTES.ATTENDEE_LIST_ORGANIZER,
    gridArea: "rightTop",
    backgroundColor: "#bb7cc1"
  },
  profile: {
    label: "My Profile",
    linkTo: ROUTES.PROFILE,
    gridArea: "rightBot",
    backgroundColor: "#1ec77a"
  }
};

const userDashboards = {
  HACKER: [
    dashboardTiles.application,
    dashboardTiles.map,
    dashboardTiles.schedule,
    dashboardTiles.attendee_list_volunteer,
    dashboardTiles.profile
  ],
  ORGANIZER: [
    dashboardTiles.app_review,
    dashboardTiles.map,
    dashboardTiles.schedule,
    dashboardTiles.attendee_list_organizer,
    dashboardTiles.profile
  ],
  VOLUNTEER: [
    dashboardTiles.attendee_list_volunteer,
    dashboardTiles.map,
    dashboardTiles.schedule,
    dashboardTiles.attendee_list_volunteer,
    dashboardTiles.profile
  ],
  JUDGE: [
    dashboardTiles.attendee_list_volunteer,
    dashboardTiles.map,
    dashboardTiles.schedule,
    dashboardTiles.attendee_list_volunteer,
    dashboardTiles.profile
  ],
  GENERAL: [
    dashboardTiles.attendee_list_volunteer,
    dashboardTiles.map,
    dashboardTiles.schedule,
    dashboardTiles.attendee_list_volunteer,
    dashboardTiles.profile
  ]
};

const enhance = compose(
  connect(state => ({
    curUserProfile: state.firebase.profile, // profile passed as props.profile
    greetingInfo: state.dashboard
      ? state.dashboard.greetingInfo
      : { greeting: "bwrwbweb", subgreeting: "webwebwebwbe" },
    toastInfo: state.dashboard
      ? state.dashboard.toastInfo
      : {
          iconName: "lightbulb",
          backgroundColor: "primary",
          contents: "Make surkuhihe to submit your application!"
        }
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
