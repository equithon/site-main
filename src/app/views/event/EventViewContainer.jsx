import React from "react";
import { UserIsAuthenticated } from "../../../utils/siteAuth";

// this is where we would normally do the redux stuffz

const EventViewContainer = () => <div> this is a test event modal </div>;

export default UserIsAuthenticated(EventViewContainer);
