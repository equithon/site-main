import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Select from "react-select";
import CreatableSelect from 'react-select/lib/Creatable';


const SelectDropdown = styled(Select)`
  width: 100%;
  height: 100%;
  padding: 0.2em;

  font-size: 100%;
  color: ${props =>
    props.theme.colors[props.outlineColor] || props.outlineColor};

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

  & .react-select__control,
  & .select__control--is-focused {
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

const SelectDropdownCreatable = styled(CreatableSelect)`
  width: 100%;
  height: 100%;
  padding: 0.2em;

  font-size: 100%;
  color: ${props =>
    props.theme.colors[props.outlineColor] || props.outlineColor};

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

  & .react-select__control,
  & .select__control--is-focused {
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



const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};
const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};

const formatGroupLabel = data => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

export default ({
  className,
  options,
  placeholder = "Select an option...",
  defaultValue,
  disabled,
  grouped,
  allowCreate,
  allowMultiple,
  outlineColor = "lightBlack",
  onChangeHandler,
  formikInfo = { notUsing: true, field: {}, form: {} }
}) => {

  const [curOptions, updateCurOptions] = useState(options);
  const [curValue, updateCurValue] = useState(allowMultiple ? [] : null);
  const [isFocused, toggleFocus] = useState(false);
  const [curState, updateCurState] = useState("HYDRATING");

  const findValueFromLabel = someLabel => {
    let foundValue;

    if(grouped) {
      curOptions.forEach(group => {
        const foundOption = group.options.find(q => q.label === someLabel);
        if(foundOption) foundValue = foundOption.value;
      })
      return foundValue;
    }

    return curOptions.find(q => q.label === someLabel) && curOptions.find(q => q.label === someLabel).value;
  }


  const createOption = newLabel => {
    const newOption = {
      label: newLabel,
      value: newLabel.toLowerCase().replace(/\W/g, ''),
    };

    if(grouped) {
      const newOptions = [...curOptions];
      const optionGroupOther = newOptions.find(group => group.label === "Other");
      if(optionGroupOther) optionGroupOther.options.push(newOption);
      else newOptions.push({label: "Other", options: [ newOption ]});
      updateCurOptions(newOptions);
      updateCurValue(allowMultiple ? [...curValue, newOption] : newOption);
    }
    else {
      updateCurOptions([...curOptions, newOption]);
      updateCurValue(allowMultiple ? [...curValue, newOption] : newOption);
    };


  };

  const hydrateFromDefault = () => {
    updateCurState("READY");


    if(allowMultiple) {
      return defaultValue.map(label => {
        const corresValue = findValueFromLabel(label);
        if(!corresValue) createOption(label)
        return { label, value: corresValue };
      });
    }

    const corresValue = findValueFromLabel(defaultValue);
    if(!corresValue) createOption(defaultValue);
    return { label: defaultValue, value: corresValue};
  }


  const updateValue = value => {
    updateCurState("CHANGED");
    updateCurValue(value);
  }

  useEffect(() => {
    if(curState === "HYDRATING" && defaultValue) updateCurValue(hydrateFromDefault());
  }, [])


  useEffect(() => {
    if (formikInfo.notUsing && curState === "CHANGED") {
      onChangeHandler(allowMultiple ? curValue.map(option => option.label) : curValue.label);
    }
  }, [curValue]);





  if(allowCreate) {
    return (
      <SelectDropdownCreatable
        className={`react-select-container ${className} ${
          isFocused ? "touched" : ""
        }`}
        classNamePrefix="react-select"
        outlineColor={outlineColor}
        isMulti={allowMultiple}
        isDisabled={disabled}
        placeholder={placeholder}
        ignoreAccents={false}
        options={curOptions}
        formatGroupLabel={formatGroupLabel}
        value={curValue}
        onBlur={() => toggleFocus(false)}
        onFocus={() => toggleFocus(true)}
        onCreateOption={createOption}
        onChange={option => updateValue(option)}
        {...formikInfo.field}
        formikForm={formikInfo.form}
      />
    );
  }

  return (
    <SelectDropdown
      className={`react-select-container ${className} ${
        isFocused ? "touched" : ""
      }`}
      classNamePrefix="react-select"
      outlineColor={outlineColor}
      isMulti={allowMultiple}
      isDisabled={disabled}
      placeholder={placeholder}
      options={options}
      value={curValue}
      onBlur={() => toggleFocus(false)}
      onFocus={() => toggleFocus(true)}
      onChange={option => updateValue(option)}
      {...formikInfo.field}
      formikForm={formikInfo.form}
    />
  );
};
