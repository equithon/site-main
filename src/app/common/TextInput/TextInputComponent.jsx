import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.input`
  width: 100%;
  height: 100%;
  padding: 0.8em;

  font-size: 100%;
  color: ${props =>
    props.theme.colors[props.outlineColor] ||
    props.outlineColor ||
    props.theme.colors.black};

  border-radius: ${props => props.theme.app.border.radius};
  border: ${props =>
    `2px solid ${props.theme.colors[props.outlineColor] ||
      props.outlineColor ||
      props.theme.colors.lightBlack}`};

  transition: box-shadow 400ms ease-in-out;
  &.touched,
  &:focus {
    outline: none;
    box-shadow: ${props =>
      `0 0 3px 1px ${props.theme.colors[props.outlineColor] ||
        props.outlineColor ||
        props.theme.colors.lightBlack}`};
  }
`;

const TextInput = ({
  className,
  name,
  type = "text",
  defaultValue = "",
  placeholder,
  outlineColor,
  onChangeHandler = () => {},
  onBlurHandler = () => {},
  formikInfo = { field: {}, form: {} }
}) => {
  const [curValue, updateCurValue] = useState(defaultValue);

  useEffect(() => {
    if (!formikInfo) onChangeHandler(curValue);
  });

  return (
    <Container
      className={className}
      name={name}
      type={type}
      placeholder={placeholder}
      outlineColor={outlineColor}
      onChange={e => updateCurValue(e.target.value)}
      onBlur={onBlurHandler}
      {...formikInfo.field}
      formikForm={formikInfo.form}
    />
  );
};

export default TextInput;
