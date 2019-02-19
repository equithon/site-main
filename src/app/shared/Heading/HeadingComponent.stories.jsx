import React from "react";
import { storiesOf } from "@storybook/react";
import Heading from "./HeadingComponent";

storiesOf("HeaderButtons", module)
  .add("Default", () => <Heading>Default is regular size</Heading>)
  .add("Big", () => <Heading size="big">BIG HEADING SIZE</Heading>)
  .add("Small", () => <Heading size="small">smol heading</Heading>)
  .add("No margin", () => <Heading noMargin>No margin</Heading>)
  .add("Big & No Margin", () => (
    <>
      <Heading noMargin size="big">
        Both!
      </Heading>
      <div>no margin above</div>
    </>
  ));
