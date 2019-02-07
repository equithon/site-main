import * as React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

// VIEW CONTAINERS
import DashboardContainer from './views/dashboard/DashboardViewContainer';
import LoginContainer from './views/login+signup/LoginViewContainer';

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
          <div>
            <Link to={{
              pathname: ROUTES.PROFILE,
              state: { modal: true }
            }}>show 'my profile' modal</Link>
          </div>
          <div>
            <Link to={{
              pathname: ROUTES.EVENT,
              state: { modal: true }
            }}>show 'event' modal</Link>
          </div>
        </div>


        {/* MAIN VIEW ROUTE SWITCHER */}
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path={ROUTES.HOME} component={DashboardContainer} />
          <Route exact path={ROUTES.SIGNUP_LOGIN} component={LoginContainer} />
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
