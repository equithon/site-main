import React from "react";
import styled from "styled-components";
import { Box } from "grommet";

const Container = styled(Box)`
  border-radius: ${props => props.theme.app.border.radius};
  color: ${props => props.theme.colors.offWhite};
  width: ${props => props.width};
  height: ${props => props.height};

  // only display cursor or darken on hover if non-static (interactive)
  cursor: ${props => (props.interactive ? "pointer" : "auto")};
  transition: filter 200ms ease-in-out;
  &:hover {
    filter: ${props =>
      props.interactive ? "brightness(95%)" : "brightness(100%)"};
  }
`;

const CardComponent = ({
  width,
  height,
  interactive,
  backgroundColor,
  backgroundImg,
  children
}) => (
  <Container
    width={width || "medium"}
    height={height}
    background={backgroundColor || `url(${backgroundImg})`}
    interactive={interactive}
  >
    {children}
  </Container>
);

export default CardComponent;
