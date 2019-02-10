import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// VIEW CONTAINERS
import DashboardViewContainer from "../../views/dashboard/DashboardViewContainer";
import LoginSignupViewContainer from "../../views/login+signup/LoginSignupViewContainer";
import ApplicationViewContainer from "../../views/application/ApplicationViewContainer";
import AppReviewViewContainer from "../../views/appreview/AppReviewViewContainer";
import AttendeesViewContainer from "../../views/attendees/AttendeesViewContainer";
import MapViewContainer from "../../views/map/MapViewContainer";
import ScheduleViewContainer from "../../views/schedule/ScheduleViewContainer";
import Error404Container from "../../views/404/Error404Container";

// MODAL CONTAINERS
import ProfileModalContainer from "../../modals/profile/ProfileModalContainer";
import EventModalContainer from "../../modals/event/EventModalContainer";

import * as ROUTES from "../../../utils/siteRoutes";

const AppNav = ({ location }) => {
  const isModal = location.state && location.state.modal;
  const curLocation = isModal
    ? { pathname: location.state.onTopOf, search: "", hash: "" }
    : location;

  return (
    <div>
      {/* MAIN VIEW ROUTE SWITCHER */}
      <Switch location={curLocation}>
        <Route
          exact
          path={ROUTES.SIGNUP_LOGIN}
          component={LoginSignupViewContainer}
        />
        <Route
          exact
          path={ROUTES.APPLICATION}
          component={ApplicationViewContainer}
        />
        <Route
          exact
          path={ROUTES.APP_REVIEW}
          component={AppReviewViewContainer}
        />
        <Route
          exact
          path={ROUTES.ATTENDEE_LIST}
          component={AttendeesViewContainer}
        />
        <Route exact path={ROUTES.MAP} component={MapViewContainer} />
        <Route exact path={ROUTES.SCHEDULE} component={ScheduleViewContainer} />
        <Route exact path={ROUTES.HOME} component={DashboardViewContainer} />
        <Route exact path={ROUTES.PAGENOTFOUND} component={Error404Container} />
        <Redirect to="/404" />
      </Switch>

      {/* MODAL DISPLAY */}
      <div className="modalContainer">
        <Switch>
          <Route
            exact
            path={ROUTES.PROFILE}
            component={ProfileModalContainer}
          />
          <Route exact path={ROUTES.EVENT} component={EventModalContainer} />
        </Switch>
      </div>
    </div>
  );
};

export default AppNav;
