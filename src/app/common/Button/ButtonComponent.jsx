import React from "react";
import styled from "styled-components";

const Container = styled.button`
  cursor: pointer;
  padding: 0.8em 2em;
  border-radius: ${props => props.theme.app.border.radius};

  font-size: 100%;
  color: white;
  background-color: ${props =>
    props.theme.colors[props.backgroundColor] ||
    props.backgroundColor ||
    props.theme.colors.black};

  transition: brightness 250ms ease-in-out;
  &:hover {
    filter: brightness(120%);
  }

  &:focus {
    outline: none;
  }
`;

const Button = ({
  className,
  label,
  disabled,
  backgroundColor,
  type = "button",
  onClickHandler = () => console.log(`clicked ${label} button`)
}) => (
  <Container
    className={className}
    type={type}
    disabled={disabled}
    backgroundColor={backgroundColor}
    onClick={disabled ? null : onClickHandler}
  >
    {label}
  </Container>
);

export default Button;
