import React from "react";
import { storiesOf } from "@storybook/react";
import PageWrapper from "./PageWrapperComponent";

storiesOf("PageWrapper", module).add("Default", () => (
  <PageWrapper title="Test Page">
    <div>only child</div>
  </PageWrapper>
));
