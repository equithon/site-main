import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { mediaSize } from "../../../../utils/siteTools";
import LoadingSpinner from "../../../../static/img/loaders/default.svg";

import Modal from "../ModalComponent";
import Heading from "../../Heading/HeadingComponent";

const closeProfileModal = (history, prevLoc) => {
  history.replace(prevLoc);
};

const updateFirebaseProfile = (firebase, profileInfo) => {
  console.log(profileInfo);
  // TODO: FIX THIS to update properly
  // firebase.updateProfile({ name: profileInfo.name });
};

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

export default ({ firebase, userProfile, history, prevLoc, isCurUser }) => {
  const [profileLoaded, setProfileLoaded] = useState(
    userProfile && userProfile.isLoaded && userProfile.name
  );
  const [profileInfo, updateProfileInfo] = useState(userProfile);
  // const isAdmin = profileLoaded && profileInfo.role === "ORGANIZER";

  useEffect(() => {
    const nowLoaded = userProfile && userProfile.isLoaded && userProfile.name;
    if (!profileLoaded && nowLoaded) {
      updateProfileInfo(userProfile);
      setProfileLoaded(true);
    } else if (profileLoaded) {
      updateFirebaseProfile(firebase, profileInfo);
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
                defaultValue={profileInfo.email}
              />
              {/* TODO: add email change */}
            </InfoField>

            <InfoField gridarea="password">
              <ChangePasswordLabel
                className="infoFieldLabel"
                onClick={() => console.log("TODO: allow change password")}
              >
                CHANGE PASSWORD
              </ChangePasswordLabel>
            </InfoField>

            <InfoField gridarea="extra">
              <div className="infoFieldLabel">ATTENDING AS A...</div>
              <input
                className="infoFieldValue"
                value={
                  profileInfo.role &&
                  profileInfo.role
                    .toLowerCase()
                    .replace(/\b(\w)/g, s => s.toUpperCase())
                }
                readOnly
                onChange={e => {
                  e.persist();
                  updateProfileInfo(prevInfo => ({
                    ...prevInfo,
                    role: e.target.value
                  }));
                }}
              />
              {/* TODO: add role change */}
            </InfoField>
          </Info>
        </Profile>
      ) : (
        <Loading />
      )}
    </ProfileModal>
  );
};
