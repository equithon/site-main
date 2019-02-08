import React from 'react';
import styled from 'styled-components';

// A generic button component that is meant to be styled by the user.

const Container = styled.button`
  margin:  auto;
  height: 3.2vw;
  width: 25vw;
  padding: 3px;

  color: white;
  font-size: 1.2em;

  border: none;
  cursor: pointer;
  border-radius: ${props => props.rounded ? '50px' : '10px'};

  will-change: transform;
  transition: transform 300ms ease-in-out;
  transform: translateY(0);
  &:hover {
    transform: ${props => props.hover ? 'translateY(-2px)' : 'translateY(0)'};
  }
`;



const Button = ({ className, onButtonClick, text, rounded, hover }) => (
  <Container onClick={onButtonClick} rounded={rounded} hover={hover} className={className}>
    {text}
  </Container>
);

export default Button;
