import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "../Modal/ModalComponent";
import { mediaSize } from "../../../utils/siteTools";
import LoadingSpinner from "../../../static/img/loaders/default.svg";

const closeProfileModal = (history, prevLoc) => {
  history.replace(prevLoc);
};

const updateFirebaseProfile = (firebase, profileInfo) => {
  console.log(profileInfo);
  // TODO: FIX THIS to update properly
  // firebase.updateProfile({ name: profileInfo.name });
};

const Container = styled.div`
  display: flex;
  background-color: grey;
  width: 60vw;
  height: 30vw;
  border-radius: ${props => props.theme.app.border.radius};
  padding: 5vw;
  box-sizing: border-box;
`;

const ProfileContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 3fr 4fr;
  grid-template-rows: auto;
  grid-template-areas: "label info";

  ${mediaSize.tablet`
  `};

  ${mediaSize.phone`
  `};
`;

const LabelContainer = styled.div`
  grid-area: label;
  align-self: start;
  font-size: 3vw;
  font-weight: 600;
`;

const InfoContainer = styled.div`
  grid-area: info;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Info = styled.div`
  grid-area: ${props => props.gridarea};
`;

const LoadingContainer = styled.div`
  width: 50%;
  height: 50%;
  margin: auto;
  background: center / contain no-repeat url(${LoadingSpinner});
`;

const ProfileModalComponent = ({
  firebase,
  userProfile,
  history,
  prevLoc,
  isCurUser
}) => {
  console.log(userProfile);
  const [profileLoaded, setProfileLoaded] = useState(
    userProfile && userProfile.isLoaded && userProfile.name
  );
  const [profileInfo, updateProfileInfo] = useState(userProfile);
  const isAdmin = profileLoaded && profileInfo.role === "ORGANIZER";

  useEffect(() => {
    const nowLoaded = userProfile && userProfile.isLoaded && userProfile.name;
    console.log(profileLoaded, nowLoaded, userProfile);
    if (!profileLoaded && nowLoaded) {
      console.log("updating");
      updateProfileInfo(userProfile);
      setProfileLoaded(true);
    } else if (profileLoaded) {
      updateFirebaseProfile(firebase, profileInfo);
    }
  });

  console.log("profile name", profileInfo.role === "ORGANIZER");

  return (
    <Modal
      fill={false}
      backgroundColor="rgb(195, 107, 163)"
      handleClickOutside={() => closeProfileModal(history, prevLoc)}
      onClickClose={() => closeProfileModal(history, prevLoc)}
    >
      <Container>
        {profileLoaded ? (
          <ProfileContainer>
            <LabelContainer>
              {isCurUser
                ? "My Profile"
                : `${profileInfo.name.split(" ")[0]}'s Profile'`}
            </LabelContainer>
            <InfoContainer>
              <Info gridarea="name">
                <div>Name</div>
                <input
                  value={profileInfo.name}
                  onChange={e => {
                    e.persist();
                    updateProfileInfo(prevInfo => ({
                      ...prevInfo,
                      name: e.target.value
                    }));
                  }}
                />
              </Info>
              <Info gridarea="email">
                <div>Email</div>
                <input defaultValue={profileInfo.email} />
                {/* TODO: add email change */}
              </Info>
              <Info gridarea="password">
                <div>Change Password</div>
              </Info>
              <Info gridarea="extra">
                <div>Attending as a...</div>
                <input
                  value={profileInfo.role}
                  readOnly={!isAdmin}
                  onChange={e => {
                    e.persist();
                    updateProfileInfo(prevInfo => ({
                      ...prevInfo,
                      role: e.target.value
                    }));
                  }}
                />
                {/* TODO: add role change */}
              </Info>
            </InfoContainer>
          </ProfileContainer>
        ) : (
          <LoadingContainer />
        )}
      </Container>
    </Modal>
  );
};

export default ProfileModalComponent;
