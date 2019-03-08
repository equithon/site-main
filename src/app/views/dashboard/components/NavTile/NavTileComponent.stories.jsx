import React from "react";
import { storiesOf } from "@storybook/react";

import NavTile from "./NavTileComponent";
import SampleImg from "../../../../../static/img/dashboard/tiles/map.png";

storiesOf("Card", module)
  .add("NavTile (Plain)", () => (
    <NavTile
      width="20em"
      height="12em"
      info={{
        label: "A NavTile",
        linkTo: "DUMMY_LINK",
        backgroundColor: "#e3a368"
      }}
    />
  ))
  .add("NavTile (Image)", () => (
    <NavTile
      width="20em"
      height="12em"
      info={{
        label: "A NavTile",
        linkTo: "DUMMY_LINK",
        backgroundImg: SampleImg,
        color: "offBlack"
      }}
    />
  ));
