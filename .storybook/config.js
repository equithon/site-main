import React from "react";
import { ThemeProvider } from "styled-components";
import {
  configure,
  addDecorator,
  getStorybook,
  setAddon
} from "@storybook/react";
import createPercyAddon from "@percy-io/percy-storybook";
import siteStyles, { GlobalStyles } from "../src/utils/siteStyles";

const req = require.context("../src/app", true, /\.stories\.jsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(story => (
  <ThemeProvider theme={siteStyles}>
    <>
      <GlobalStyles />
      {story()}
    </>
  </ThemeProvider>
));

const { percyAddon, serializeStories } = createPercyAddon();
setAddon(percyAddon);

configure(loadStories, module);

serializeStories(getStorybook);
