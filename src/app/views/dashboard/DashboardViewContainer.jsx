import React from 'react';
import DashboardViewComponent from './DashboardViewComponent';
import { UserIsAuthenticated } from '../../../utils/siteAuth';


// this is where we would normally do the redux stuffz


const testUserName = 'Bob';

const DashboardViewContainer = () => <DashboardViewComponent userName={testUserName} />;


export default UserIsAuthenticated(DashboardViewContainer);
