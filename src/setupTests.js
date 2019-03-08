// This file sets up the necessary tools and utilities for Jest testing.

// It's placed here instead of in the /utils folder since
// CRA does not allow it to be placed anywhere else
// otherwise `react-scripts test` will not find it.

import Adapter from "enzyme-adapter-react-16";
import { configure, mount, shallow } from "enzyme";
import { ThemeConsumer } from "styled-components";
import "jest-styled-components";
import siteTheme from "./utils/siteStyles";


configure({ adapter: new Adapter() });

const mountWithTheme = (tree, theme = siteTheme) => {
  ThemeConsumer._currentValue = theme;
  return mount(tree);
};

const shallowWithTheme = (tree, theme = siteTheme) => {
  shallow(tree, { theme })
};


// Allow use of these functions without having to import them in
// every test.jsx file
global.mountWithTheme = mountWithTheme;
global.shallowWithTheme = shallowWithTheme;
