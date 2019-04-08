import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = styled.button`
  cursor: pointer;
  padding: ${props => props.theme.app.container.padding};
  border-radius: ${props => props.theme.app.border.radius};

  font-size: 100%;
  color: ${props => props.theme.colors[props.color] || props.color};
  background-color: ${props =>
    props.theme.colors[props.backgroundColor] || props.backgroundColor};

  will-change: filter;
  transition: filter 250ms ease-in-out;
  &:hover {
    filter: brightness(110%);
  }

  // remove annoying blue Chrome outline when focused
  &:focus {
    outline: none;
  }
`;

export default ({
  className,
  label,
  icon,
  disabled,
  color = "white",
  backgroundColor = "black",
  type = "button",
  onClickHandler = () => {}
}) => (
  <Button
    className={className}
    type={type}
    disabled={disabled}
    color={color}
    backgroundColor={backgroundColor}
    onClick={disabled ? null : onClickHandler}
  >
    {icon ? <FontAwesomeIcon icon={icon} size="1x" /> : label}
  </Button>
);
