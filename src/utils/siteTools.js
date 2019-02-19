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

library.add(
  faLightbulb,
  faExclamation,
  faTimes,
  faCheck,
  faDoorClosed,
  faDoorOpen,
  faQuestion
);

export const displaySizes = {
  desktop: 2160,
  tablet: 1024,
  phone: 600
};

export const mediaSize = Object.keys(displaySizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${displaySizes[label] / 16}em) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});
