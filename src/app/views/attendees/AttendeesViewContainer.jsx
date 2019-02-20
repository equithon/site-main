import React from 'react';
import AttendeesViewComponent from './AttendeesViewComponent';
import { accessIfAuthenticated } from '../../../utils/siteAuth';


// this is where we would normally do the redux stuffz
const AttendeesViewContainer = () => <AttendeesViewComponent/>;


export default accessIfAuthenticated(AttendeesViewContainer);
