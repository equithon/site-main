/* eslint-disable no-undef */
import React from "react";

import Card from "./CardComponent";

describe("Button", () => {
  it("renders correctly", () => {
    const component = mountWithTheme(<Card />);
    expect(component).toMatchSnapshot();
  });
});
