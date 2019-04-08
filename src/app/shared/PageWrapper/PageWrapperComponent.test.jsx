/* eslint-disable no-undef */
import React from "react";

import PageWrapper from "./PageWrapperComponent";

describe("PageWrapper", () => {
  it.skip("renders correctly", () => {
    const component = mountWithTheme(<PageWrapper />);
    expect(component).toMatchSnapshot();
  });
});
