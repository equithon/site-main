/* eslint-disable no-undef */
import React from "react";

import TextInput from "./TextInputComponent";

describe("TextInput", () => {
  it("renders correctly", () => {
    const component = mountWithTheme(
      <TextInput placeholder="This is a test text area" />
    );
    expect(component).toMatchSnapshot();
  });
});
