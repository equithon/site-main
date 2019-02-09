import React from 'react';
import styled from 'styled-components';

import { mediaSize } from '../../../utils/siteTools';

// A generic button component that is meant to be styled by the user.

const Container = styled.div`
  margin: 0 auto 1vw auto;
  padding: 3px;
  position: relative;
  background: ${props => props.theme.colors.offGrey};
  z-index: 1;
  border-radius: 8px;
  overflow: hidden;
  box-sizing: border-box;


  & .border {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 0%;
    height: 0%;
    background: ${props => props.theme.colors.secondary};
    z-index: -1;
    transition: height 400ms, width 400ms 200ms;
  }
`;

const InputBox = styled.input`
  color: #708090;
  box-sizing: border-box;
  outline: none;
  border: none;


  font-size: ${props => props.theme.sizes.normalText.desktop};
  z-index: 2;
  border-radius: 6px;
  padding: 2%;
  width: 100%;
  height: 100%;

  &:focus ~ .border {
    width: 100%;
    height: 100%;
  }

  transition: color 200ms ease-in-out;
  color: ${props => props.theme.colors.offBlack};
  &:focus {
    color: ${props => props.theme.colors.secondary};
  }

  ${mediaSize.tablet`
    font-size: ${props => props.theme.sizes.normalText.tablet};
  `}

  ${mediaSize.phone`
    font-size: ${props => props.theme.sizes.normalText.phone};
  `}
`;




const Input = ({ className, placeholder, outlineColor, type, name, formikForm }) => (
  <Container className={className} outlineColor={outlineColor}>
    <InputBox
      placeholder={placeholder}
      type={type}
      name={name}
      onChange={formikForm ? formikForm.handleChange : null}
      onBlur={formikForm ? formikForm.handleBlur : null}
      value={formikForm ? formikForm.values.name : null}
    />
    <div className="border" />
  </Container>
);

export default Input;
