/* eslint-disable no-undef */
import React from "react";

import LoginSignupFormsComponent from "./LoginSignupFormsComponent";

it.skip("should render correctly with no props", () => {
  const component = shallowWithTheme(
    <LoginSignupFormsComponent
      logIn={() => {}}
      signUp={() => {}}
      validationSchemas={{}}
      errorTable={{}}
    />
  );

  expect(component).toMatchSnapshot();
});
