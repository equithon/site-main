import { connect } from "react-redux";
import { withFirebase } from "react-redux-firebase";
import { compose, withProps } from "recompose";
import { withRouter } from "react-router-dom";
import { UserIsAuthenticated } from "../../../utils/siteAuth";
import { HOME as ROUTE_DASHBOARD } from "../../../utils/siteRoutes";

import ProfileModal from "../../modals/Profile/ProfileModalComponent";

const enhance = compose(
  connect(state => ({
    userProfile: Object.assign({}, state.firebase.profile, state.firebase.auth)
  })),
  UserIsAuthenticated,
  withRouter,
  withProps({
    prevLoc: ROUTE_DASHBOARD,
    isCurUser: true
  }),
  withFirebase
);

export default enhance(ProfileModal);
