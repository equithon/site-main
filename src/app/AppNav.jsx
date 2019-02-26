import React from "react";
import styled from "styled-components";
import { Route, Switch, Redirect } from "react-router-dom";

// VIEW CONTAINERS
import DashboardView from "./views/dashboard/DashboardViewContainer";
import LoginSignupView from "./views/login+signup/LoginSignupViewContainer";
import ApplicationView from "./views/application/ApplicationViewContainer";
import AppReviewView from "./views/appreview/AppReviewViewContainer";
import AttendeesView from "./views/attendees/AttendeesViewContainer";
import MapView from "./views/map/MapViewContainer";
import ScheduleView from "./views/schedule/ScheduleViewContainer";
import PageNotFoundView from "./views/404/PageNotFoundContainer";
import MyProfileView from "./views/myprofile/MyProfileViewContainer";
import EventView from "./views/event/EventViewContainer";

import * as ROUTES from "../utils/siteRoutes";

const ModalFrame = styled.div`
  display: ${props => (props.show ? "flex" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(88, 88, 88, 0.49);
`;

const AppNav = ({ location }) => {

  const route = ROUTES.FINDER[location.pathname];
  const curLocation = route &&
    route.state && route.state.modal
      ? { pathname: route.state.onTopOf, search: "", hash: "" }
      : location;

  return (
    <div>
      {/* MAIN VIEW ROUTE SWITCHER */}
      <Switch location={curLocation}>
        <Route exact path={ROUTES.SIGNUP_LOGIN} component={LoginSignupView} />
        <Route exact path={ROUTES.APPLICATION} component={ApplicationView} />
        <Route exact path={ROUTES.APP_REVIEW} component={AppReviewView} />
        <Route
          exact
          path={ROUTES.ATTENDEE_LIST_VOLUNTEER.pathname}
          component={AttendeesView}
        />
        <Route exact path={ROUTES.MAP} component={MapView} />
        <Route exact path={ROUTES.SCHEDULE} component={ScheduleView} />
        <Route exact path={ROUTES.HOME} component={DashboardView} />
        <Route exact path={ROUTES.PAGENOTFOUND} component={PageNotFoundView} />
        <Redirect to="/404" />
      </Switch>

      {/* MODAL DISPLAY */}
      <ModalFrame show={route && route.state && route.state.modal}>
        <Switch>
          <Route
            exact
            path={ROUTES.PROFILE.pathname}
            component={MyProfileView}
          />
          <Route exact path={ROUTES.EVENT} component={EventView} />
        </Switch>
      </ModalFrame>
    </div>
  );
};

export default AppNav;
