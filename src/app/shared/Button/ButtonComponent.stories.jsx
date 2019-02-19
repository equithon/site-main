import React from "react";
import { storiesOf } from "@storybook/react";
import Button from "./ButtonComponent";

storiesOf("Button", module)
  .add("Default", () => <Button label="Default" />)
  .add("Custom Color", () => (
    <Button backgroundColor="rgb(146, 160, 241)" label="Blue!" />
  ));
