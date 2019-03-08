import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { mediaSize } from "../../../../../utils/siteTools";

import Heading from "../../../../shared/Heading/HeadingComponent";
import Card from "../../../../shared/Card/CardComponent";

const NavTile = styled(Card)`
  grid-area: ${props => props.gridarea};

  width: 100%;
  height: 100%;
  padding: 1.5em;
  border-radius: ${props => props.theme.app.border.radius};

  background-color: ${props => props.backgroundColor};
  filter: ${props => (props.disabled ? "grayscale(90%)" : "")};
`;

const NavTileLink = styled(Link)`
  grid-area: ${props => props.gridarea};
  text-decoration: none;
`;

export default ({
  label,
  color,
  backgroundColor,
  backgroundImg,
  linkTo,
  gridArea,
  disabled
}) => {

  const augmentedLinkTo = (typeof linkTo === 'object') ? { ...linkTo, state: { ...linkTo.state, cameFromApp: true }} : { pathname: linkTo, state: { cameFromApp: true }};
  const [tileClicked, setClicked] = useState(false);

  if (tileClicked) setClicked(false);

  const Tile = (
    <NavTile
      gridarea={gridArea}
      backgroundColor={backgroundColor}
      backgroundImg={backgroundImg}
      disabled={disabled}
      onClickHandler={disabled ? undefined : () => setClicked(true)}
    >
      <Heading size="small" color={color || "white"} weight="normal">
        {label}
      </Heading>
    </NavTile>
  );

  return disabled ? (
    Tile
  ) : (
    <NavTileLink
      gridarea={gridArea}
      replace={augmentedLinkTo.state && augmentedLinkTo.state.modal}
      to={augmentedLinkTo}
    >
      {Tile}
    </NavTileLink>
  );
};
