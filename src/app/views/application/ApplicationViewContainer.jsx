import React from 'react';
import ApplicationViewComponent from './ApplicationViewComponent';
import { UserIsAuthenticated } from '../../../utils/siteAuth';


// this is where we would normally do the redux stuffz
const ApplicationViewContainer = () => <ApplicationViewComponent/>;


export default UserIsAuthenticated(ApplicationViewContainer);
