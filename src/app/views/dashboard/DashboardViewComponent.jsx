import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../../utils/siteRoutes";

import NavTile from "./components/NavTileComponent";

const DashboardViewComponent = ({ logOutUser, curUserProfile }) => (
  <div>
    Good morning,{" "}
    {curUserProfile && curUserProfile.isLoaded ? curUserProfile.name : ""}. This
    is the dashboard.
    <div>
      <Link
        to={{
          pathname: ROUTES.PROFILE,
          state: { modal: true, onTopOf: "/" }
        }}
      >
        Show my profile modal
      </Link>
    </div>
    <NavTile
      width="6em"
      height="auto"
      info={{ label: "MAP", linkTo: ROUTES.MAP, backgroundColor: "#e3a368" }}
    />
    {/* <div>
        <Link to={ROUTES.APPLICATION}>My Application</Link>
        </div>
        <div>
        <Link to={ROUTES.APP_REVIEW}>Application Review Tool</Link>
        </div>
        <div>
        <Link to={ROUTES.ATTENDEE_LIST}>Attendee List</Link>
        </div>
        <div>
        <Link to={ROUTES.MAP}>Event Map</Link>
        </div>
        <div>
        <Link to={ROUTES.SCHEDULE}>Event Schedule</Link>
      </div> */}
    <button type="button" onClick={() => logOutUser()}>
      Log Out
    </button>
  </div>
);

export default DashboardViewComponent;
