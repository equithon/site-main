/* eslint-disable no-undef */
import React from "react";

import Toast from "./ToastComponent";

describe("Heading", () => {
  it("renders correctly as default", () => {
    const component = mountWithTheme(
      <Toast>
        This is a default toast.
      </Toast>
    );
    expect(component).toMatchSnapshot();
  });

  it("renders correctly with custom icon", () => {
    const component = mountWithTheme(
      <Toast icon="times">
        This is a toast with a custom icon.
      </Toast>
    );
    expect(component).toMatchSnapshot();
  });
})
