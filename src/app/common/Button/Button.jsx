import React from 'react';
import styled from 'styled-components';

import { mediaSize } from '../../../utils/siteTools';

// A generic button component that is meant to be styled by the user.

const Container = styled.button`
  margin:  auto;
  border: none;
  border-radius: ${props => props.rounded ? '50px' : '10px'};
  cursor: pointer;
  box-sizing: border-box;

  will-change: transform;
  transition: transform 300ms ease-in-out;
  transform: translateY(0);
  &:hover {
    transform: ${props => props.hover ? 'translateY(-2px)' : 'translateY(0)'};
  }

  color: white;
  font-size: ${props => props.theme.sizes.normalText.desktop};

  ${mediaSize.tablet`
    font-size: ${props => props.theme.sizes.normalText.tablet};
  `}

  ${mediaSize.phone`
    font-size: ${props => props.theme.sizes.normalText.phone};
  `}
`;



const Button = ({ className, onButtonClick, text, rounded, hover, type }) => (
  <Container type={type} onClick={onButtonClick} rounded={rounded} hover={hover} className={className}>
    {text}
  </Container>
);

export default Button;
