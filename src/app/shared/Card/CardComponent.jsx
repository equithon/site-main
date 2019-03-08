import React from "react";
import styled from "styled-components";


const Card = styled.div`
  padding: ${props => props.theme.app.container.padding};
  border-radius: ${props => props.theme.app.border.radius};

  color: ${props => props.theme.colors[props.color] || props.color};
  background-color: ${props => props.theme.colors[props.backgroundColor] || props.backgroundColor};
  background: ${props => props.backgroundImg ? `center / cover no-repeat url(${props.backgroundImg});` : ''};

  // only display cursor or expand on hover if clickable
  cursor: ${props => (props.clickable ? "pointer" : "auto")};

  will-change: transform;
  transition: transform 150ms ease-in-out;
  transform: scale(1.01);
  &:hover {
    transform: ${props => (props.clickable ? "scale(1.05)" : "scale(1.01)")};
  }
`;


export default ({
  className,
  color = "white",
  backgroundColor = "black",
  backgroundImg,
  onClickHandler,
  children
}) => (
  <Card
    className={className}
    color={color}
    backgroundColor={backgroundColor}
    backgroundImg={backgroundImg}
    onClick={onClickHandler}
    clickable={(onClickHandler !== undefined)}
  >
    {children}
  </Card>
);
