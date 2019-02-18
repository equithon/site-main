import React from "react";
import { storiesOf } from "@storybook/react";
import TextInput from "./TextInputComponent";

storiesOf("TextInput", module)
  .add("Default", () => <TextInput placeholder="Default" />)
  .add("Custom Outline", () => (
    <TextInput outlineColor="rgb(146, 160, 241)" placeholder="Blue!" />
  ));
