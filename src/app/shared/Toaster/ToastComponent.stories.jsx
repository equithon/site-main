import React from "react";
import { storiesOf } from "@storybook/react";
import Toast from "./ToastComponent";


storiesOf("Toast", module)
  .add("Default", () => (
    <Toast>
      This is a default toast.
    </Toast>
  ))
  .add("Custom Size", () => (
    <Toast width="45vw" height="12vw">
      This is a toast with width 45vw and height 12vw.
    </Toast>
  ))
  .add("Custom Icon", () => (
    <Toast icon="times">
      This is a toast with a custom icon.
    </Toast>
  ));
