import React from "react";
import { UserIsAuthenticated } from "../../../utils/siteAuth";

import ProfileModal from "./ProfileModalComponent";

// this is where we would normally do the redux stuffz

const ProfileModalContainer = () => (
  <ProfileModal backgroundColor="rgb(195, 107, 163)" />
);

export default UserIsAuthenticated(ProfileModalContainer);
