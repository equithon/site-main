import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TextArea = styled.textarea`
  width: 100%;
  max-width: 100%;
  height: 100%;
  padding: ${props => props.theme.app.container.padding};

  font-size: 100%;
  color: ${props =>
    props.theme.colors[props.outlineColor] || props.outlineColor};

  border-radius: ${props => props.theme.app.border.radius};
  border: ${props =>
    `2px solid ${props.theme.colors[props.outlineColor] ||
      props.outlineColor}`};

  transition: box-shadow 400ms ease-in-out;
  &:focus {
    outline: none;
    box-shadow: ${props =>
      `0 0 3px 1px ${props.theme.colors[props.outlineColor] ||
        props.outlineColor}`};
  }

  &:read-only {
    background-color: hsl(0,0%,95%);
    color: ${props => props.theme.colors.grey};
  }
`;

export default ({
  className,
  name,
  type = "text",
  defaultValue = "",
  placeholder = `Enter ${type} here`,
  disabled,
  outlineColor = "lightBlack",
  onChangeHandler = () => {},
  onBlurHandler = () => {},
  formikInfo = { notUsing: true, field: {}, form: {} }
}) => {
  const [value, updateValue] = useState(defaultValue);

  useEffect(() => {
    if (formikInfo.notUsing && value && (defaultValue !== value)) {
      onChangeHandler(value);
    }
  }, [value]);

  return (
    <TextArea
      className={className}
      outlineColor={outlineColor}
      name={name}
      type={type}
      value={value}
      readOnly={disabled}
      placeholder={placeholder}
      onChange={e => updateValue(e.target.value)}
      onBlur={onBlurHandler}
      {...formikInfo.field}
      formikForm={formikInfo.form}
    />
  );
};
