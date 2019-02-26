import React from "react";
import styled from "styled-components";
import { Route, Switch, Redirect } from "react-router-dom";
import { spring, AnimatedSwitch } from 'react-router-transition';

// VIEW CONTAINERS
import LoginSignupView from "./views/login+signup/LoginSignupViewContainer";
import DashboardView from "./views/dashboard/DashboardViewContainer";
import ApplicationView from "./views/application/ApplicationViewContainer";
import AppReviewView from "./views/appreview/AppReviewViewContainer";
import AttendeesView from "./views/attendees/AttendeesViewContainer";
import MapView from "./views/map/MapViewContainer";
import ScheduleView from "./views/schedule/ScheduleViewContainer";
import MyProfileView from "./views/myprofile/MyProfileViewContainer";
import EventView from "./views/event/EventViewContainer";
import HelpView from "./views/help/HelpViewContainer";
import JudgingToolView from "./views/judging/JudgingToolViewContainer";
import PageNotFoundView from "./views/misc/404/PageNotFoundContainer";

import * as ROUTES from "../utils/siteRoutes";

const mapStyles = styles => ({
  opacity: styles.opacity,
  transform: styles.scale !== 1 ? `scale(${styles.scale})` : 'none',
});

const bounce = val => spring(val, { stiffness: 350, damping: 30 });

const bounceTransitionScaleUp = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    scale: 0.1,
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.5),
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
    scale: bounce(1),
  },
};

const bounceTransitionScaleDown = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    scale: 1.2,
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.8),
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
    scale: bounce(1),
  },
};

const AppContainer = styled.div`
  & > .switch-wrapper {
    position: relative;
    z-index: 1;

    & > div {
      position: absolute;
      // center the element
      width: 100vw;
      margin: 0 auto;
      left: 0;
      right: 0;
    }
  }
`;


const ModalFrame = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: ${props => (props.show ? "10" : "-1")};
  background-color: ${props => (props.show ? "rgba(88, 88, 88, 0.49)" : "white")};

  & > * {
    margin: auto;
  }
`;



const AppNav = ({ location }) => {
  const route = ROUTES.FINDER[location.pathname];
  const isModal = route && route.state && route.state.modal;
  const curLocation = isModal
      ? { pathname: route.state.onTopOf, search: "", hash: "" }
      : location;

  return (
    <AppContainer>
      {/* MAIN VIEW ROUTE SWITCHER */}
      <AnimatedSwitch
        location={curLocation}
        atEnter={bounceTransitionScaleDown.atEnter}
        atLeave={bounceTransitionScaleDown.atLeave}
        atActive={bounceTransitionScaleDown.atActive}
        mapStyles={mapStyles}
        className="switch-wrapper"
      >
        <Route exact path={ROUTES.SIGNUP_LOGIN} component={LoginSignupView} />
        <Route exact path={ROUTES.HOME} component={DashboardView} />

        <Route exact path={ROUTES.APPLICATION} component={ApplicationView} />
        <Route exact path={ROUTES.APP_REVIEW} component={AppReviewView} />
        <Route
          exact
          path={ROUTES.ATTENDEE_LIST_VOLUNTEER.pathname}
          component={AttendeesView}
        />
        <Route exact path={ROUTES.MAP} component={MapView} />
        <Route exact path={ROUTES.SCHEDULE} component={ScheduleView} />
        <Route exact path={ROUTES.HELP} component={HelpView} />
        <Route exact path={ROUTES.JUDGING_TOOL} component={JudgingToolView} />

        <Route exact path={ROUTES.PAGENOTFOUND} component={PageNotFoundView} />
        <Redirect to="/404" />
      </AnimatedSwitch>

      {/* MODAL DISPLAY */}
      <ModalFrame show={isModal}>
        <AnimatedSwitch
          atEnter={bounceTransitionScaleUp.atEnter}
          atLeave={bounceTransitionScaleUp.atLeave}
          atActive={bounceTransitionScaleUp.atActive}
          mapStyles={mapStyles}
        >
          <Route
            exact
            path={ROUTES.PROFILE.pathname}
            component={MyProfileView}
          />
          <Route exact path={ROUTES.EVENT} component={EventView} />
        </AnimatedSwitch>
      </ModalFrame>
    </AppContainer>
  );
};

export default AppNav;
