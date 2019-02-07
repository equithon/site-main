import * as React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

// VIEW CONTAINERS
import DashboardViewContainer from './views/dashboard/DashboardViewContainer';
import LoginViewContainer from './views/login+signup/LoginViewContainer';
import ApplicationViewContainer from './views/application/ApplicationViewContainer';
import AppReviewViewContainer from './views/appreview/AppReviewViewContainer';
import AttendeesViewContainer from './views/attendees/AttendeesViewContainer';
import MapViewContainer from './views/map/MapViewContainer';
import ScheduleViewContainer from './views/schedule/ScheduleViewContainer';


// MODAL CONTAINERS
import ProfileModalContainer from './modals/profile/ProfileModalContainer';
import EventModalContainer from './modals/event/EventModalContainer';

import * as ROUTES from '../utils/siteRoutes';

class AppNav extends React.Component {
  constructor(props) {
    super(props);

    this.previousLocation = this.props.location;
  }


  componentWillUpdate(nextProps) {
    const { location } = this.props;
    // save previous location if its not a modal
    if (
      nextProps.history.action !== "POP" &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = location;
    }
  }


  render() {
    const { location } = this.props;
    const isModal = location.state && location.state.modal;
    return (
      <div>
        <div className="testNavigationBarShouldRemoveLater">
          <div><Link to={ROUTES.HOME}>Dashboard</Link></div>
          <div><Link to={ROUTES.SIGNUP_LOGIN}>Sign Up/Log In</Link></div>
          <div><Link to={ROUTES.APPLICATION}>My Application</Link></div>
          <div><Link to={ROUTES.APP_REVIEW}>Application Review Tool</Link></div>
          <div><Link to={ROUTES.ATTENDEELIST}>Attendee List</Link></div>
          <div><Link to={ROUTES.MAP}>Event Map</Link></div>
          <div><Link to={ROUTES.SCHEDULE}>Event Schedule</Link></div>
        </div>


        {/* MAIN VIEW ROUTE SWITCHER */}
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path={ROUTES.SIGNUP_LOGIN} component={LoginViewContainer} />
          <Route exact path={ROUTES.HOME} component={DashboardViewContainer} />
          <Route exact path={ROUTES.APPLICATION} component={ApplicationViewContainer} />
          <Route exact path={ROUTES.APP_REVIEW} component={AppReviewViewContainer} />
          <Route exact path={ROUTES.ATTENDEELIST} component={AttendeesViewContainer} />
          <Route exact path={ROUTES.MAP} component={MapViewContainer} />
          <Route exact path={ROUTES.SCHEDULE} component={ScheduleViewContainer} />
        </Switch>

        {/* MODAL DISPLAY */}
        <div className="modalContainer">
          <Switch>
            <Route exact path={ROUTES.PROFILE} component={ProfileModalContainer} />
            <Route exact path={ROUTES.EVENT} component={EventModalContainer} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default AppNav;
