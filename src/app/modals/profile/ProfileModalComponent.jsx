import React from "react";
import { withRouter } from "react-router-dom";
import Modal from "../../common/Modal/ModalComponent";
import { HOME as ROUTE_DASHBOARD } from "../../../utils/siteRoutes";

const closeProfileModal = history => {
  history.replace(ROUTE_DASHBOARD);
};

const ProfileModalComponent = ({ backgroundColor, history }) => (
  <Modal
    fill={false}
    backgroundColor={backgroundColor}
    handleClickOutside={() => history.replace()}
    onClickClose={() => closeProfileModal(history)}
  >
    this is my profile modal
  </Modal>
);

export default withRouter(ProfileModalComponent);
