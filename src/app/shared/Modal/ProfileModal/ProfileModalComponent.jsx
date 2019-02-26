import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { mediaSize } from "../../../../utils/siteTools";
import LoadingSpinner from "../../../../static/img/loaders/default.svg";
import SiteContext from "../../../../utils/siteContext";

import Modal from "../ModalComponent";
import Heading from "../../Heading/HeadingComponent";


const ProfileModal = styled(Modal)`
  width: 60vw;
  height: 35vw;
  padding: 5vw;

  border-radius: ${props => props.theme.app.border.radius};

  ${mediaSize.tablet`
    width: 55vw;
    height: 60vw;
    padding: 6vw 5vw;
  `};

  ${mediaSize.phone`
    width: 80vw;
    height: 100vw;
    padding: 10vw;
  `};
`;

const Profile = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 3fr 4fr;
  grid-template-rows: auto;
  grid-template-areas: "label info";

  ${mediaSize.tablet`
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 1fr 4fr;
    grid-template-areas:
      "label"
      "info";
  `};

  ${mediaSize.phone`
  `};
`;



const Info = styled.div`
  grid-area: info;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoField = styled.div`
  grid-area: ${props => props.gridarea};

  & .infoFieldLabel {
    color: #d6d6d6;
    font-size: 0.8em;
    font-weight: 600;
  }

  & .infoFieldValue {
    border: none;
    outline: none;
    background: none;
    box-shadow: none;

    color: white;
    font-size: 2em;
    font-weight: 500;

    ${mediaSize.phone`
      font-size: 1.5em;
    `};
  }
`;

const ChangePasswordLabel = styled.div`
  display: inline-block;
  margin-bottom: 4vw;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }
`;

const Loading = styled.div`
  width: 50%;
  height: 50%;
  margin: auto;
  background: center / contain no-repeat url(${LoadingSpinner});
`;

export default ({
  history,
  prevLoc,
  isCurUser
}) => {
  const { state: { firebase } } = useContext(SiteContext);

  const [profileLoaded, setProfileLoaded] = useState(
    isCurUser ? curUser !== undefined : someUser !== undefined
  );
  const [profileInfo, updateProfileInfo] = useState(
    isCurUser ? curUser : someUser
  );
  const [passwordFieldLabel, updatePasswordFieldLabel] = useState("CHANGE / RESET PASSWORD");

  const updateFirebaseProfile = () => {
    if(curUser) firebase.updateUserName(curUser.uid, profileInfo.name);
  };

  const closeProfileModal = () => {
    updateFirebaseProfile();
    history.replace(prevLoc);
  };

  useEffect(() => {
    const nowLoaded = isCurUser
      ? curUser !== undefined
      : someUser !== undefined;
    if (!profileLoaded && nowLoaded) {
      updateProfileInfo(isCurUser ? curUser : someUser);
      setProfileLoaded(true);
    }
  });

  return (
    <ProfileModal
      backgroundColor="#11985a"
      handleClickOutside={() => closeProfileModal(history, prevLoc)}
      onClickCloseHandler={() => closeProfileModal(history, prevLoc)}
    >
      {profileLoaded ? (
        <Profile>
          <Heading size="big" color="white">
            {isCurUser
              ? "My Profile"
              : `${profileInfo.name.split(" ")[0]}'s Profile'`}
          </Heading>

          <Info>
            <InfoField gridarea="name">
              <div className="infoFieldLabel">NAME</div>
              <input
                className="infoFieldValue"
                value={profileInfo.name}
                onChange={e => {
                  e.persist();
                  updateProfileInfo(prevInfo => ({
                      ...prevInfo,
                      name: e.target.value
                  }));
                }}
              />
            </InfoField>

            <InfoField gridarea="email">
              <div className="infoFieldLabel">EMAIL</div>
              <input
                className="infoFieldValue"
                value={profileInfo.email}
                readOnly
              />
            </InfoField>

            <InfoField gridarea="password">
              <ChangePasswordLabel
                className="infoFieldLabel"
                onClick={() => {updatePasswordFieldLabel("A PASSWORD RESET LINK HAS BEEN SENT TO YOUR EMAIL."); firebase.resetPassword()}}
              >
                {passwordFieldLabel}
              </ChangePasswordLabel>
            </InfoField>

            <InfoField gridarea="extra">
              <div className="infoFieldLabel">ATTENDING AS A...</div>
              <input
                className="infoFieldValue"
<<<<<<< HEAD
                value={profileInfo.role && profileInfo.role.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase())}
                readOnly
                onChange={e => {
                  e.persist();
                  updateProfileInfo(prevInfo => ({
                      ...prevInfo,
                      role: e.target.value
                  }));
                }}
=======
                value={
                  profileInfo.role &&
                  profileInfo.role
                  .toLowerCase()
                  .replace(/\b(\w)/g, s => s.toUpperCase())
                }
                readOnly
>>>>>>> 8c462db... :fire: Add Firebase logic for applications and application reviews (#7)
              />
            </InfoField>
          </Info>
        </Profile>
      ) : (
        <Loading />
      )}
    </ProfileModal>
  );
};
