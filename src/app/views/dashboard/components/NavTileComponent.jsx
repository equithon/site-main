import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { mediaSize } from "../../../../utils/siteTools";

import Card from "../../../common/Card/CardComponent";

const Container = styled.div`
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

const NavTileComponent = ({ info }) => {
  const [tileClicked, setClicked] = useState(false);

  if (tileClicked) return <Redirect push to={info.linkTo} />;

  return (
    <Card
      gridArea={info.gridArea}
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
  );
};

export default NavTileComponent;
