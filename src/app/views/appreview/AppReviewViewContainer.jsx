import React from 'react';
import AppReviewViewComponent from './AppReviewViewComponent';
import { accessIfAuthenticated } from '../../../utils/siteAuth';


// this is where we would normally do the redux stuffz
const AppReviewViewContainer = () => <AppReviewViewComponent/>;


export default accessIfAuthenticated(AppReviewViewContainer);
