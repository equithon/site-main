import React from "react";
import { UserIsAuthenticated } from "../../../utils/siteAuth";

const EventViewContainer = () => <div> this is a test event modal </div>;

export default UserIsAuthenticated(EventViewContainer);
