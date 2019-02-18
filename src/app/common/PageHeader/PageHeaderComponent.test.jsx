/* eslint-disable no-undef */
import React from "react";
import { shallowWithTheme } from ",,/../../../setupTests";

import PageHeader from "./PageHeaderComponent";

it("should render correctly with no children", () => {
  const component = shallowWithTheme(<PageHeader />);
  expect(component).toMatchSnapshot();
});

it("should render correctly with a button", () => {
  const component = shallowWithTheme(
    <PageHeader logoClickHandler={logoClickHandler}>
      <button type="button">click me</button>
    </PageHeader>
  );

  expect(component).toMatchSnapshot();
});
