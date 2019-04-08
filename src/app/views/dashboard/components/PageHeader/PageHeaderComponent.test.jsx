/* eslint-disable no-undef */
import React from "react";

import PageHeader from "./PageHeaderComponent";

const logoClickHandler = () => console.log("clicked the logo");

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
