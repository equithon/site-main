/* eslint-disable no-undef */
import React from "react";
import { shallowWithTheme } from ",,/../../../setupTests";

import LogoButtonHeaderComponent from "./LogoButtonHeaderComponent";

it("should render correctly with no props", () => {
  const component = shallowWithTheme(<LogoButtonHeaderComponent />);

  expect(component).toMatchSnapshot();
});
