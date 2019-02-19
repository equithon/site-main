/* eslint-disable no-undef */
import React from "react";

import Heading from "./HeadingComponent";

describe("Heading", () => {
  it("renders correctly", () => {
    const component = mountWithTheme(<Heading>Test Heading</Heading>);
    expect(component).toMatchSnapshot();
  });
});
