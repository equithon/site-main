import React from "react";
import { accessIfAuthenticated } from "../../../utils/siteAuth";

// this is where we would normally do the redux stuffz

const EventViewContainer = () => <div> this is a test event modal </div>;

export default accessIfAuthenticated(EventViewContainer);
