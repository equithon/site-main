import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Select from 'react-select';


const SelectDropdown = styled(Select)`
  width: 100%;
  height: 100%;
  padding: ${props => props.theme.app.container.padding};

  font-size: 100%;
  color: ${props =>
    props.theme.colors[props.outlineColor] ||
    props.outlineColor};

  border-radius: ${props => props.theme.app.border.radius};
  border: ${props =>
    `2px solid ${props.theme.colors[props.outlineColor] ||
      props.outlineColor}`};

  transition: box-shadow 400ms ease-in-out;
  &.touched {
    outline: none;
    box-shadow: ${props =>
      `0 0 3px 1px ${props.theme.colors[props.outlineColor] ||
        props.outlineColor}`};
  }

  & .react-select__control, & .select__control--is-focused {
    border: none;
    box-shadow: none;
  }

  & .react-select__menu {
    margin-top: 0.2em;

    & .react-select__option {
      cursor: pointer;
    }
  }
`;


export default ({
  className,
  options,
  placeholder = 'Select an option...',
  defaultValue,
  disabled,
  allowMultiple,
  outlineColor,
  onChangeHandler,
  formikInfo = { notUsing: true, field: {}, form: {} }
}) => {

  const [value, updateValue] = useState(defaultValue);
  const [isFocused, toggleFocus] = useState(false);
  const [isFilled, setFilled] = useState(defaultValue !== '');

  useEffect(() => {
    if(defaultValue !== value) onChangeHandler(value);
  });

  return (
    <SelectDropdown
      className={`react-select-container ${className} ${isFocused ? 'touched' : ''}`}
      classNamePrefix='react-select'
      outlineColor={outlineColor}
      isMulti={allowMultiple}
      isDisabled={disabled}
      placeholder={placeholder}
      options={options}
      defaultValue={defaultValue && {value: defaultValue, label: options.find(o => o.value === defaultValue).label}}
      onBlur={() => toggleFocus(false)}
      onFocus={() => toggleFocus(true)}
      onChange={(option) => {setFilled(true); updateValue(option.value)}}
      {...formikInfo.field}
      formikForm={formikInfo.form}
    />
  );
};
