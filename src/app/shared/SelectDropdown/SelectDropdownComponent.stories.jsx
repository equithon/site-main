import React from "react";
import { storiesOf } from "@storybook/react";
import SelectDropdown from "./SelectDropdownComponent";

const sampleQuestionDataDropdown = {
  id: "favFood",
  label: "What is your favourite food?",
  placeholder: "Pizza...",
  options: [
    { label: "Pizza", value: "pizza" },
    { label: "Sushi", value: "sushi" },
    { label: "Tacos", value: "tacos" }
  ],
  type: "select"
};

storiesOf("SelectDropdown", module)
  .add("Default", () => (
    <SelectDropdown options={sampleQuestionDataDropdown.options} />
  ))
  .add("Custom Outline", () => (
    <SelectDropdown
      outlineColor="rgb(146, 160, 241)"
      options={sampleQuestionDataDropdown.options}
    />
  ));
