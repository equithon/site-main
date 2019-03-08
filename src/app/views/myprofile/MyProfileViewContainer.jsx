import { compose, withProps } from "recompose";
import { withRouter } from "react-router-dom";
import { accessIfAuthenticated } from "../../../utils/siteAuth";
import { HOME as ROUTE_DASHBOARD } from "../../../utils/siteRoutes";

import ProfileModal from "../../shared/Modal/ProfileModal/ProfileModalComponent";

const enhance = compose(
  accessIfAuthenticated,
  withRouter,
  withProps({
    prevLoc: ROUTE_DASHBOARD,
    isCurUser: true
  })
);

export default enhance(ProfileModal);
