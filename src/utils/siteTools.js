import React, { useContext } from "react";
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
  faQuestion,
  faChevronUp,
  faChevronDown,
  faChevronCircleLeft,
  faTrophy
} from "@fortawesome/free-solid-svg-icons";
import Favicon from "../static/img/misc/favicon.ico";
import SiteContext from "./siteContext";
import WorldUniversityList from "../static/assets/world_universities_and_domains";

library.add(
  faLightbulb,
  faExclamation,
  faTimes,
  faCheck,
  faDoorClosed,
  faDoorOpen,
  faQuestion,
  faChevronUp,
  faChevronDown,
  faChevronCircleLeft,
  faTrophy
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
export const HeadContents = () => {
  const { state: { siteTitle } } = useContext(SiteContext);
  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta
        name="description"
        content="Personalized dashboard and home base for Equithon 2019 attendees."
      />
      <link
        rel="icon"
        href={Favicon}
        sizes={["16x16", "32x32", "64x64", "128x128"]}
        type="image/ico"
      />
    </Helmet>
  );
};



export const universityListOptions = WorldUniversityList.map(uni => ({
  label: `${uni.name} (${uni.alpha_two_code})`,
  value: uni.name && uni.name.toLowerCase().replace(/\W/g, '')
}))
