import React from "react";
import styled from "styled-components";
import { Box } from "grommet";

const Container = styled(Box)`
  border-radius: ${props => props.theme.app.border.radius};
  color: ${props => props.theme.colors.offWhite};
  width: ${props => props.width};
  height: ${props => props.height};

  // only display cursor or expand on hover if non-static (interactive)
  cursor: ${props => (props.interactive ? "pointer" : "auto")};

  transition: transform 150ms ease-in-out;
  transform: scale(1.01);
  &:hover {
    transform: ${props => (props.interactive ? "scale(1.05)" : "scale(1.01)")};
  }
`;

const CardComponent = ({
  className,
  width,
  height,
  gridArea,
  interactive,
  backgroundColor,
  backgroundImg,
  onClickHandler,
  children
}) => (
  <Container
    className={className}
    width={width || "medium"}
    height={height}
    gridArea={gridArea}
    background={backgroundColor || `url(${backgroundImg})`}
    interactive={interactive}
    onClick={interactive ? () => onClickHandler() : null}
  >
    {children}
  </Container>
);

export default CardComponent;
