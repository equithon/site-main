import React from "react";
import { withRouter } from "react-router-dom";
import Modal from "../../common/Modal/ModalComponent";

// this is where we would normally do the redux stuffz

const ProfileModalComponent = ({ backgroundColor, history }) => (
  <Modal
    fill={false}
    backgroundColor={backgroundColor}
    handleClickOutside={() => history.goBack()}
  >
    this is my profile modal
  </Modal>
);

export default withRouter(ProfileModalComponent);
