import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../../utils/siteRoutes";

class DashboardViewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { logOutUser } = this.props;
    return (
      <div>
        Good morning,{" "}
        {this.props.profile.isLoaded ? this.props.profile.name : ""}. This is
        the dashboard.
        <div>
          <Link
            to={{
              pathname: ROUTES.PROFILE,
              state: { modal: true, onTopOf: "/" }
            }}
          >
            Show my profile modal
          </Link>
        </div>
        <div>
          <Link to={ROUTES.APPLICATION}>My Application</Link>
        </div>
        <div>
          <Link to={ROUTES.APP_REVIEW}>Application Review Tool</Link>
        </div>
        <div>
          <Link to={ROUTES.ATTENDEELIST}>Attendee List</Link>
        </div>
        <div>
          <Link to={ROUTES.MAP}>Event Map</Link>
        </div>
        <div>
          <Link to={ROUTES.SCHEDULE}>Event Schedule</Link>
        </div>
        <button type="button" onClick={() => logOutUser()}>
          Log Out
        </button>
      </div>
    );
  }
}

export default DashboardViewComponent;
