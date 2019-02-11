import React from "react";
import styled from "styled-components";
import { Heading, Text, Grid } from "grommet";

// import { Link } from "react-router-dom";
// import * as ROUTES from "../../../utils/siteRoutes";
import { mediaSize } from "../../../utils/siteTools";
import LogoButtonHeader from "../../common/LogoButtonHeader/LogoButtonHeaderComponent";

import NavTile from "./components/NavTileComponent";

const Container = styled.div`
  width: 90vw;
  height: 85vh;
  margin: 5vh 5vw 10vh 5vw;

`;

const DashboardContainer = styled.div`
  height: 70vh;
  padding: 1em 1em;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 7fr 3fr;
  grid-template-areas:
    "greeting tiles"
    "toast tiles";



  ${mediaSize.tablet`
    height: auto;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 2fr 8fr;
    grid-template-areas:
      "greeting toast"
      "tiles tiles";
  `};

  ${mediaSize.phone`
    grid-template-columns: auto;
    grid-template-rows: 3fr 2fr auto;
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
    color: grey;
  }

  & h1 {
    color: ${props => props.theme.colors.offBlack};
  }
`;


const ToastContainer = styled.div`
  grid-area: toast;

  //background-color: rgb(170, 170, 170);
`;


const TilesContainer = styled.div`
  grid-area: tiles;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 3fr 3fr 1fr 1fr 3fr;
  grid-template-areas:
    "centerTop centerTop"
    "leftTop rightTop"
    "leftTop rightTop"
    "leftBot rightTop"
    "leftBot rightBot";
  grid-gap: 1.5em;

  ${mediaSize.tablet`
  `};

  ${mediaSize.phone`

  `};

`;


const DashboardViewComponent = ({ logOutUser, curUserProfile, userDashboards }) => (
  <Container>
    <LogoButtonHeader />

    <DashboardContainer>
      <GreetingContainer>
        <Text size="xxlarge" weight="600">Good morning,</Text>
        <Heading level="1" size="large" margin="xsmall">
          {curUserProfile && curUserProfile.isLoaded ? curUserProfile.name : ""}.
        </Heading>
        <Text size="xxlarge" weight="600">There are 24 days until Equithon!</Text>
      </GreetingContainer>

      <ToastContainer>
        This is a toast
      </ToastContainer>

      <TilesContainer>
        {curUserProfile && curUserProfile.isLoaded && userDashboards[curUserProfile.role].map(tileInfo => <NavTile info={tileInfo} />)}
        {/* <TilesColumnLeft>

          </TilesColumnLeft>
          <TilesColumnRight>

        </TilesColumnRight> */}
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
