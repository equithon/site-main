import React from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mediaSize } from "../../../utils/siteTools";

import Heading from "../../shared/Heading/HeadingComponent";
import ToastCard from "../../shared/Card/ToastCard/ToastCardComponent";
import PageHeader from "./components/PageHeader/PageHeaderComponent";
import NavTile from "./components/NavTile/NavTileComponent";


const Container = styled.div`
  max-width: 85vw;
  width: 85vw;
  height: 82vh;
  margin: 8vh auto 10vh auto;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${mediaSize.tablet`
    height: 86vh;
    margin: 7vh auto;
  `};

  ${mediaSize.phone`
    max-width: 80vw;
    width: 80vw;
    height: auto;
  `};
`;

const Dashboard = styled.section`
  height: 65vh;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 2em;
  grid-template-rows: 7fr 3fr;
  grid-template-areas:
    "greeting tiles"
    "toast tiles";

  ${mediaSize.tablet`
    height: 75vh;
    padding: 1em 1em;
    margin-top: 3vh;

    grid-template-columns: 3fr 1fr 2fr;
    grid-template-rows: 2fr 8fr;
    grid-row-gap: 2em;
    grid-template-areas:
      "greeting greeting toast"
      "tiles tiles tiles";
  `};

  ${mediaSize.phone`
    height: auto;
    padding: 0;

    grid-template-columns: auto;
    grid-template-rows: 3fr 2fr auto;
    grid-row-gap: 2em;
    grid-template-areas:
      "greeting"
      "toast"
      "tiles";
  `};
`;

const GreetingContainer = styled.div`
  grid-area: greeting;
  overflow-x: hidden;

  ${mediaSize.tablet`
    white-space: nowrap;
  `};

  ${mediaSize.phone`
    white-space: normal;
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

const ActionButton = styled.span`
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
  background-color: ${props => props.theme.colors.grey} !important;
  padding: 0.5em;
  margin: 0;
`;

/* ---------------------- DASHBOARD COMPONENT ------------------------------- */
const DashboardViewComponent = ({
  logOut,
  curUser,
  greetingInfo,
  toastInfo,
  userDashboards
}) => (
  <Container>
    <PageHeader>
      <ActionButton onClick={logOut} data-tip="Log Out">
        <FontAwesomeIcon icon="door-open" size="1x" color="grey" />
      </ActionButton>
      <ActionTooltip place="bottom" effect="float" />
    </PageHeader>

    <Dashboard>
      <GreetingContainer>
        <Heading size="small" weight="normal" color="grey">
          {greetingInfo.greeting},
        </Heading>
        <Heading size="4em">
          {curUser ? `${curUser.name.split(" ")[0]}.` : ""}
        </Heading>
        <Heading size="small" weight="normal" color="grey">
          {greetingInfo.subgreeting}
        </Heading>
      </GreetingContainer>

      <ToastContainer>
        <ToastCard
          icon={toastInfo.iconName}
          backgroundColor={toastInfo.backgroundColor}
          className="dashboardToast"
        >
          {toastInfo.contents}
        </ToastCard>
      </ToastContainer>

      <TilesContainer>
        {curUser &&
          userDashboards[curUser.role] &&
          userDashboards[curUser.role].map(tileInfo => (
            <NavTile key={tileInfo.label} {...tileInfo} />
          ))}
      </TilesContainer>
    </Dashboard>
  </Container>
);

export default DashboardViewComponent;
