import React from "react";
import styled from "styled-components";


const Container = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: ${props => props.theme.app.border.radius};

  color: white;

  // only display cursor or expand on hover if non-static (interactive)
  cursor: ${props => (props.interactive ? "pointer" : "auto")};

  transition: transform 150ms ease-in-out;
  transform: scale(1.01);
  &:hover {
    transform: ${props => (props.interactive ? "scale(1.05)" : "scale(1.01)")};
  }
`;

const Card = ({
  className,
  width,
  height,
  interactive,
  backgroundColor,
  backgroundImg,
  onClickHandler,
  children
}) => (
  <Container
    className={className}
    width={width}
    height={height}
    backgroundColor={backgroundColor}
    backgroundImg={`url(${backgroundImg})`}
    interactive={interactive}
    onClick={interactive ? () => onClickHandler() : null}
  >
    {children}
  </Container>
);

export default Card;
