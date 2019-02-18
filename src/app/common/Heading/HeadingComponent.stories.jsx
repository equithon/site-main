import React from "react";
import { storiesOf } from "@storybook/react";
import Heading from "./HeadingComponent";

storiesOf("HeaderButtons", module)
  .add("Default", () => <Heading>Default</Heading>)
  .add("Main", () => <Heading main>Main Heading</Heading>)
  .add("No margin", () => <Heading noMargin>No Margin</Heading>)
  .add("Main & No Margin", () => (
    <Heading noMargin main>
      Both!
    </Heading>
  ));
