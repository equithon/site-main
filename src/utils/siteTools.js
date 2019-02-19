import React from "react";
import Helmet from "react-helmet";
import { css } from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faLightbulb,
  faExclamation,
  faTimes,
  faCheck,
  faDoorClosed,
  faDoorOpen,
  faQuestion
} from "@fortawesome/free-solid-svg-icons";
import Favicon from "../static/img/logo/logo_tiny_color.png";

library.add(
  faLightbulb,
  faExclamation,
  faTimes,
  faCheck,
  faDoorClosed,
  faDoorOpen,
  faQuestion
);

export const displayWidthCutoffs = {
  desktop: 2160,
  tablet: 1024,
  phone: 600
};

// tool to help apply styles selectively based on device width
export const mediaSize = Object.keys(displayWidthCutoffs).reduce(
  (acc, label) => {
    acc[label] = (...args) => css`
      @media (max-width: ${displayWidthCutoffs[label] / 16}em) {
        ${css(...args)}
      }
    `;
    return acc;
  },
  {}
);

// react-helmet header
export const HeadContents = ({ pageTitle = "Equithon" }) => (
  <Helmet>
    <title>{pageTitle}</title>
    <meta
      name="description"
      content="Personalized dashboard and home base for Equithon 2019 attendees."
    />
    <link
      rel="icon"
      href={Favicon}
      sizes={["16x16", "32x32", "64x64", "128x128"]}
      type="image/png"
    />
  </Helmet>
);
