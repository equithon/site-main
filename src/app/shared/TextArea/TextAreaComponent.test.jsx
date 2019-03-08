/* eslint-disable no-undef */
import React from "react";

import TextArea from "./TextAreaComponent";

describe("TextArea", () => {
  it("renders correctly", () => {
    const component = mountWithTheme(<TextArea placeholder="This is a test text area" />);
    expect(component).toMatchSnapshot();
  });
});
