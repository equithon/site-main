import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { mediaSize } from "../../../../utils/siteTools";

import Card from "../../../common/Card/CardComponent";

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: ${props => props.theme.app.border.radius};
  padding: 1em;
  box-sizing: border-box;

  // can specify color in theme, another color, or default is white
  color: ${props =>
    props.color in props.theme.colors
      ? props.theme.colors[props.color]
      : props.color || "white"};
  background-color: ${props => props.backgroundColor};

  font-weight: 600;
  font-size: 1.5em;

  ${mediaSize.tablet`
    font-size: 2em;
  `};

  ${mediaSize.phone`
    font-size: 1.25em;
  `};
`;

const NavTileLink = styled(Link)`
  grid-area: ${props => props.gridarea};
  text-decoration: none;
`;

const NavTileComponent = ({ info }) => {
  const [tileClicked, setClicked] = useState(false);

  if (tileClicked) setClicked(false);

  return (
    <NavTileLink
      gridarea={info.gridArea}
      replace={info.linkTo.state && info.linkTo.state.modal}
      to={info.linkTo}
    >
      <Card
        width="100%"
        height="100%"
        fill={false}
        backgroundColor={info.backgroundColor}
        backgroundImg={info.backgroundImg}
        onClickHandler={() => setClicked(true)}
        interactive
      >
        <Container color={info.color} backgroundColor={info.backgroundColor}>
          {info.label}
        </Container>
      </Card>
    </NavTileLink>
  );
};

export default NavTileComponent;
