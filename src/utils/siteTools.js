import { css, createGlobalStyle } from "styled-components";

import SFProDisplayBlackOTF from "../static/fonts/SF-Pro-Display-Black.otf";
import SFProDisplayBoldOTF from "../static/fonts/SF-Pro-Display-Bold.otf";
import SFProDisplayHeavyOTF from "../static/fonts/SF-Pro-Display-Heavy.otf";
import SFProDisplayLightOTF from "../static/fonts/SF-Pro-Display-Light.otf";
import SFProDisplayMediumOTF from "../static/fonts/SF-Pro-Display-Medium.otf";
import SFProDisplayRegularOTF from "../static/fonts/SF-Pro-Display-Regular.otf";
import SFProDisplaySemiboldOTF from "../static/fonts/SF-Pro-Display-Semibold.otf";
import SFProDisplayThinOTF from "../static/fonts/SF-Pro-Display-Thin.otf";

export const displaySizes = {
  desktop: 2160,
  tablet: 1024,
  phone: 600
};

// Iterate through the sizes and create a media template
export const mediaSize = Object.keys(displaySizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${displaySizes[label] / 16}em) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

export const GlobalStyles = createGlobalStyle`
    html, body {
      margin: 0;
      padding: 0;

      box-sizing: border-box;
    }

    @font-face {
      font-family: "SF Pro Display";
      font-style: normal;
      font-weight: 900;
      src: url(${SFProDisplayBlackOTF}) format("opentype");
    }

    @font-face {
      font-family: "SF Pro Display";
      font-style: normal;
      font-weight: 800;
      src: url(${SFProDisplayHeavyOTF}) format("opentype");
    }

    @font-face {
      font-family: "SF Pro Display";
      font-style: normal;
      font-weight: 700;
      src: url(${SFProDisplayBoldOTF}) format("opentype");
    }

    @font-face {
      font-family: "SF Pro Display";
      font-style: normal;
      font-weight: 600;
      src: url(${SFProDisplaySemiboldOTF}) format("opentype");
    }

    @font-face {
      font-family: "SF Pro Display";
      font-style: normal;
      font-weight: 500;
      src: url(${SFProDisplayMediumOTF}) format("opentype");
    }

    @font-face {
      font-family: "SF Pro Display";
      font-style: normal;
      font-weight: 400;
      src: url(${SFProDisplayRegularOTF}) format("opentype");
    }

    @font-face {
      font-family: "SF Pro Display";
      font-style: normal;
      font-weight: 300;
      src: url(${SFProDisplayLightOTF}) format("opentype");
    }

    @font-face {
      font-family: "SF Pro Display";
      font-style: normal;
      font-weight: 100;
      src: url(${SFProDisplayThinOTF}) format("opentype");
    }
  `;
