import React from "react";
import { storiesOf } from "@storybook/react";
import TextArea from "./TextAreaComponent";

storiesOf("TextArea", module)
  .add("Default", () => <TextArea placeholder="Default" />)
  .add("Custom Outline", () => (
    <TextArea outlineColor="rgb(146, 160, 241)" placeholder="Blue!" />
  ));
