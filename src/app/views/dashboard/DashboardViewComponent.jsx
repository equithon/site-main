import React from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import { Heading, Text } from "grommet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { Link } from "react-router-dom";
// import * as ROUTES from "../../../utils/siteRoutes";
import { mediaSize } from "../../../utils/siteTools";
import LogoButtonHeader from "../../common/LogoButtonHeader/LogoButtonHeaderComponent";
import ToastCard from "../../common/ToastCard/ToastCardComponent";

import NavTile from "./components/NavTileComponent";

const Container = styled.div`
  width: 85vw;
  height: 86vh;
  margin: 7vh auto;

  ${mediaSize.phone`
    width: 75vw;
  `};
`;

const DashboardContainer = styled.div`
  height: 65vh;
  padding: 5vh 5px 0 5px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 2em;
  grid-template-rows: 7fr 3fr;
  grid-template-areas:
    "greeting tiles"
    "toast tiles";

  ${mediaSize.tablet`
    padding: 1em 1em;
    height: 75vh;
    margin-top: 2vw;
    grid-template-columns: 3fr 1fr 2fr;
    grid-template-rows: 2fr 8fr;
    grid-row-gap: 5vw;
    grid-template-areas:
      "greeting greeting toast"
      "tiles tiles tiles";
  `};

  ${mediaSize.phone`
    height: 85vh;
    margin-top: 0;
    padding: 0;
    grid-template-columns: auto;
    grid-template-rows: 3fr 2fr auto;
    grid-row-gap: 1em;
    grid-template-areas:
      "greeting"
      "toast"
      "tiles";
  `};
`;

const GreetingContainer = styled.div`
  grid-area: greeting;

  //background-color: rgb(191, 191, 191);

  & span {
    color: ${props => props.theme.colors.offGrey};
    font-weight: 600;
  }

  & h1 {
    color: ${props => props.theme.colors.offBlack};
  }

  ${mediaSize.tablet`
    white-space: nowrap;
    & h1 {
      font-size: 4em;
      line-height: normal;
    }
  `};

  ${mediaSize.phone`
    white-space: normal;

    & span {
      font-size: 1.5em;
      line-height: normal;
    }

    & h1 {
      font-size: 3em;
      line-height: normal;
    }
  `};
`;

const ToastContainer = styled.div`
  grid-area: toast;
  align-self: end;

  width: 25vw;
  height: auto;

  ${mediaSize.tablet`
    width: 35vw;
    align-self: start;
    justify-self: right;
  `};

  ${mediaSize.phone`
    width: 100%;
    align-self: center;
    justify-self: center;
  `};
`;

const TilesContainer = styled.div`
  grid-area: tiles;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 3.5fr 3fr 1fr 1fr 3fr;
  grid-template-areas:
    "centerTop centerTop"
    "leftTop rightTop"
    "leftTop rightTop"
    "leftBot rightTop"
    "leftBot rightBot";
  grid-gap: 1.5em;

  ${mediaSize.tablet`
    grid-gap: 2em;
  `};

  ${mediaSize.phone`
    grid-gap: 1em;
    margin-bottom: 2em;
  `};
`;

const ActionButton = styled.div`
  display: inline-block;
  cursor: pointer;
  margin: 0 1vw;

  transition: transform 150ms ease-in-out;
  transform: scale(1.3);
  &:hover {
    transform: scale(1.5);
  }

  & ~ .__react_component_tooltip:after {
    border: none;
  }
`;

const ActionTooltip = styled(ReactTooltip)`
  font-family: "SF Pro Display" !important;
  font-weight: 600 !important;
  background-color: ${props => props.theme.colors.offGrey} !important;
  padding: 0 0.5em;
  margin: 0;
`;

const DashboardViewComponent = ({
  logOutUser,
  curUserProfile,
  userDashboards
}) => (
  <Container>
    <LogoButtonHeader>
      <div>
        {/* <ActionButton onClick={() => {}} data-tip="Help"><FontAwesomeIcon icon="question" size="1x" color="grey" /></ActionButton> */}
        <ActionButton onClick={logOutUser} data-tip="Log Out">
          <FontAwesomeIcon icon="door-open" size="1x" color="grey" />
        </ActionButton>
        <ActionTooltip place="bottom" effect="float" />
      </div>
    </LogoButtonHeader>

    <DashboardContainer>
      <GreetingContainer>
        <Text size="xxlarge" responsive={false}>
          Good morning,
        </Text>
        <Heading level="1" size="large" margin="xsmall">
          {curUserProfile && curUserProfile.isLoaded ? curUserProfile.name : ""}
          .
        </Heading>
        <Text size="xxlarge">There are 24 days until Equithon!</Text>
      </GreetingContainer>

      <ToastContainer>
        <ToastCard
          iconName="lightbulb"
          backgroundColor="primary"
          className="dashboardToast"
        >
          There are 254 unreviewed applications currently.
        </ToastCard>
      </ToastContainer>

      <TilesContainer>
        {curUserProfile &&
          curUserProfile.isLoaded &&
          userDashboards[curUserProfile.role].map(tileInfo => (
            <NavTile key={tileInfo.label} info={tileInfo} />
          ))}
      </TilesContainer>
    </DashboardContainer>

    {/*
      <TileContainer>
      <Distribution
        values={userDashboards[curUserProfile.role]}
      >
        {value => (
      <NavTile info={value} />
        )}
      </Distribution>
      </TileContainer>


      <button type="button" onClick={() => logOutUser()}>
      Log Out
      </button>

    */}
  </Container>
);

export default DashboardViewComponent;
