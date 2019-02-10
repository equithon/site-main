import React from 'react';
import { UserIsAuthenticated } from '../../../utils/siteAuth';


// this is where we would normally do the redux stuffz


const ProfileModalContainer = () => <div> this is my profile modal </div>;


export default UserIsAuthenticated(ProfileModalContainer);
