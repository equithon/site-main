import React from 'react';
import { Link } from 'react-router-dom';
import { EVENT as ROUTE_EVENT } from '../../../utils/siteRoutes';



const ScheduleViewComponent = () => (
  <div>
    This is the schedule
    <div><Link to={{ pathname: ROUTE_EVENT, state: { modal: true, onTopOf: '/schedule' } }}>show a specific event modal</Link></div>
  </div>
);

export default ScheduleViewComponent;
