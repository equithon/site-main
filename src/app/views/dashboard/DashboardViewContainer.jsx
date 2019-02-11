import { connect } from "react-redux";
import { withFirebase } from "react-redux-firebase";
import { compose, withHandlers, withProps } from "recompose";

import { UserIsAuthenticated } from "../../../utils/siteAuth";
import * as ROUTES from "../../../utils/siteRoutes";
import DashboardViewComponent from "./DashboardViewComponent";

import MapTileBG from "../../../static/img/dashboard/tiles/map.png";
import CalendarTileBG from "../../../static/img/dashboard/tiles/schedule.png";

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
    color: "offBlack"
  },
  application: {
    label: "My Application",
    linkTo: ROUTES.APPLICATION,
    gridArea: "centerTop",
    backgroundColor: "#6cbe72"
  },
  app_review: {
    label: "Application Review",
    linkTo: ROUTES.APP_REVIEW,
    gridArea: "centerTop",
    backgroundColor: "#e3a368"
  },
  attendee_list_volunteer: {
    label: "Check In Tool",
    linkTo: { pathname: ROUTES.ATTENDEE_LIST, state: { as: "VOLUNTEER" } },
    gridArea: "rightTop",
    backgroundColor: "#66ADEF"
  },
  attendee_list_organizer: {
    label: "Attendee List",
    linkTo: { pathname: ROUTES.ATTENDEE_LIST, state: { as: "ORGANIZER" } },
    gridArea: "rightTop",
    backgroundColor: "#bb7cc1"
  },
  profile: {
    label: "My Profile",
    linkTo: { pathname: ROUTES.PROFILE, state: { modal: true, onTopOf: "/" } },
    gridArea: "rightBot",
    backgroundColor: "#1ec77a"
  }
};

const userDashboards = {
  HACKER: [
    { value: 50, ...dashboardTiles.application },
    { value: 30, ...dashboardTiles.map },
    { value: 30, ...dashboardTiles.schedule },
    { value: 20, ...dashboardTiles.attendee_list_volunteer },
    { value: 15, ...dashboardTiles.profile }
  ],
  ORGANIZER: [
    { value: 60, ...dashboardTiles.app_review },
    { value: 30, ...dashboardTiles.map },
    { value: 30, ...dashboardTiles.schedule },
    { value: 20, ...dashboardTiles.attendee_list_organizer },
    { value: 15, ...dashboardTiles.profile }
  ],
  VOLUNTEER: [
    { value: 60, ...dashboardTiles.attendee_list_volunteer },
    { value: 30, ...dashboardTiles.map },
    { value: 30, ...dashboardTiles.schedule },
    { value: 20, ...dashboardTiles.attendee_list_volunteer },
    { value: 15, ...dashboardTiles.profile }
  ],
  JUDGE: [
    { value: 60, ...dashboardTiles.attendee_list_volunteer },
    { value: 30, ...dashboardTiles.map },
    { value: 30, ...dashboardTiles.schedule },
    { value: 20, ...dashboardTiles.attendee_list_volunteer },
    { value: 15, ...dashboardTiles.profile }
  ],
  GENERAL: [
    { value: 60, ...dashboardTiles.attendee_list_volunteer },
    { value: 30, ...dashboardTiles.map },
    { value: 30, ...dashboardTiles.schedule },
    { value: 20, ...dashboardTiles.attendee_list_volunteer },
    { value: 15, ...dashboardTiles.profile }
  ]
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
