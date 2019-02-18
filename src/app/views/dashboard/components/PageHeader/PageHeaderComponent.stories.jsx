import React from "react";
import { storiesOf } from "@storybook/react";
import PageHeader from "./PageHeaderComponent";

const logoClickHandler = () => console.log("clicked the logo");

storiesOf("PageHeader", module)
  .add("Default", () => <PageHeader logoClickHandler={logoClickHandler} />)
  .add("with Button", () => (
    <PageHeader logoClickHandler={logoClickHandler}>
      <button type="button">click me</button>
    </PageHeader>
  ));
