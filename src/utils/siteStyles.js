import { createGlobalStyle } from "styled-components";
import SFProDisplayBlackOTF from "../static/fonts/SF-Pro-Display-Black.otf";
import SFProDisplayBoldOTF from "../static/fonts/SF-Pro-Display-Bold.otf";
import SFProDisplayHeavyOTF from "../static/fonts/SF-Pro-Display-Heavy.otf";
import SFProDisplayLightOTF from "../static/fonts/SF-Pro-Display-Light.otf";
import SFProDisplayMediumOTF from "../static/fonts/SF-Pro-Display-Medium.otf";
import SFProDisplayRegularOTF from "../static/fonts/SF-Pro-Display-Regular.otf";
import SFProDisplaySemiboldOTF from "../static/fonts/SF-Pro-Display-Semibold.otf";
import SFProDisplayThinOTF from "../static/fonts/SF-Pro-Display-Thin.otf";

export const colors = {
  black: "#454545",
  lightBlack: "#5c5c5c",
  grey: "#aaaaaa",

  primary: "#a16beb",
  secondary: "#50a2f1",

  warning: "#F4A867",
  error: "#F07285",
  green: "#6cc46a"
};

export const sizes = {
  heading: {
    big: "2.5em",
    normal: "2em",
    small: "1.5em"
  },
  bodyText: {
    big: "1.2em",
    normal: "1em",
    small: "0.8em",
    tiny: "0.5em"
  }
}

export const app = {
  font: {
    family: "SF Pro Display",
    weight: {
      bold: "600",
      normal: "500",
      light: "400",
    },
  },
  border: {
    width: "2px",
    radius: "6px"
  },
  container: {
    padding: "0.8em"
  }
};

const siteTheme = {
  colors,
  app,
  sizes
};

export default siteTheme;

export const GlobalStyles = createGlobalStyle`
  html, body, * {
    margin: 0;
    padding: 0;

    box-sizing: border-box;

    font-family: ${app.font.family}
    font-weight: ${app.font.weight.normal}
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
