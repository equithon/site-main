import React from "react";
import { storiesOf } from "@storybook/react";
import ToastCard from "./ToastCardComponent";

storiesOf("ToastCard", module).add("Default", () => (
  <ToastCard
    iconName="lightbulb"
    backgroundColor="primary"
    className="dashboardToast"
  >
    There are 254 unreviewed applications currently.
  </ToastCard>
));
