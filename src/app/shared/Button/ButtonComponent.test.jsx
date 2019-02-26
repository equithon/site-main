/* eslint-disable no-undef */
import React from "react";

import Button from "./ButtonComponent";

describe("Button", () => {
  it("renders correctly", () => {
    const buttonComponent = mountWithTheme(<Button label="Default" />);
    expect(buttonComponent).toMatchSnapshot();
  });
});
