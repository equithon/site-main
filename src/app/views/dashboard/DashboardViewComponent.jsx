import React from 'react';
import { Link } from 'react-router-dom';
import { PROFILE as ROUTE_MY_PROFILE } from '../../../utils/siteRoutes';


class DashboardViewComponent extends React.Component {
  render() {
    const { userName } = this.props;

    return (
      <div>
        Good morning, { userName }. This is the dashboard.
        <div><Link to={{ pathname: ROUTE_MY_PROFILE, state: { modal: true } }}>Show 'my profile' modal</Link></div>
      </div>
    );
  }
}

export default DashboardViewComponent;
