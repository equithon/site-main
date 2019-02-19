import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Container = styled.span`
  width: ${props => props.width};
  height: ${props => props.height};
  padding: 2% 0;

  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 25% 75%;
  grid-column-gap: 3%;
  grid-template-areas: "icon contents";
  justify-content: space-between;

  border-radius: ${props => props.theme.defaults.borderRadius};

  color: white;
  background-color: ${props => props.backgroundColor || props.theme.colors.blue};

  & > * { // center children vertically
    margin: auto 0;
  }

`;

const ToastIcon = styled.div`
  grid-area: icon;
  justify-self: center;
`;

const ToastContents = styled.div`
  grid-area: contents;

  font-size: 1em;
`;



const Toast = ({
  className,
  width = '100%',
  height = '100%',
  icon = 'cogs',
  backgroundColor,
  children
}) => (
  <Container
    className={className}
    width={width}
    height={height}
    backgroundColor={backgroundColor}
  >
    <ToastIcon>
      <FontAwesomeIcon icon={icon} size="2x" />
    </ToastIcon>
    <ToastContents>
      {children}
    </ToastContents>
  </Container>
);


export default Toast;
