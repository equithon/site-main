import React from "react";
import { accessIfAuthenticated } from "../../../utils/siteAuth";

const EventViewContainer = () => <div> this is a test event modal </div>;

export default accessIfAuthenticated(EventViewContainer);
