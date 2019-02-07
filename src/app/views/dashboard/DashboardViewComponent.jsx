import React from 'react';
import { Link } from 'react-router-dom';
import { PROFILE as ROUTE_MY_PROFILE } from '../../../utils/siteRoutes';


class DashboardViewComponent extends React.Component {
  render() {
    const { logOutUser } = this.props;

    return (
      <div>
        Good morning, NAME. This is the dashboard.
        <div><Link to={{ pathname: ROUTE_MY_PROFILE, state: { modal: true } }}>Show 'my profile' modal</Link></div>
        <div onClick={() => logOutUser()}>Log Out</div>
      </div>
    );
  }
}

export default DashboardViewComponent;
