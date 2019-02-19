import { configure, mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "jest-styled-components";
import { ThemeConsumer } from "styled-components";
import { defaultProps } from "grommet";
import merge from "deepmerge";
import siteTheme from "./utils/siteStyles";

configure({ adapter: new Adapter() });

const mountWithTheme = (tree, theme = siteTheme) => {
  ThemeConsumer._currentValue = merge(theme, defaultProps);
  return mount(tree);
};

const shallowWithTheme = (tree, theme = siteTheme) => shallow(tree, { theme });

global.mountWithTheme = mountWithTheme;
global.shallowWithTheme = shallowWithTheme;
