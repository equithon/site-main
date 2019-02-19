import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Heading from "../../../../shared/Heading/HeadingComponent";
import Card from "../../../../shared/Card/CardComponent";

const NavTile = styled(Card)`
  width: 100%;
  height: 100%;
  padding: 1.5em;
  border-radius: ${props => props.theme.app.border.radius};

  background-color: ${props => props.backgroundColor};
`;

const NavTileLink = styled(Link)`
  grid-area: ${props => props.gridarea};
  text-decoration: none;
`;

export default ({
  info: { label, color, backgroundColor, backgroundImg, linkTo, gridArea }
}) => {
  const [tileClicked, setClicked] = useState(false);

  if (tileClicked) setClicked(false);

  return (
    <NavTileLink
      gridarea={gridArea}
      replace={linkTo.state && linkTo.state.modal}
      to={linkTo}
    >
      <NavTile
        backgroundColor={backgroundColor}
        backgroundImg={backgroundImg}
        onClickHandler={() => setClicked(true)}
      >
        <Heading size="small" color={color || "white"} weight="normal">
          {label}
        </Heading>
      </NavTile>
    </NavTileLink>
  );
};
