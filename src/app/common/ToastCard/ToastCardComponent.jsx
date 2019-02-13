import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { mediaSize } from "../../../utils/siteTools";
import Card from "../Card/CardComponent";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  border-radius: ${props => props.theme.app.border.radius};
  padding: 1em;

  font-weight: 500;

  // can specify color in theme, another color, or default is white
  color: ${props =>
    props.color in props.theme.colors
      ? props.theme.colors[props.color]
      : props.color || "white"};
  background-color: ${props =>
    props.backgroundColor in props.theme.colors
      ? props.theme.colors[props.backgroundColor]
      : props.backgroundColor || props.theme.colors.primary};

  ${mediaSize.tablet`
    font-size: 0.8em;
    line-height: normal;
  `};

  ${mediaSize.phone`
  `};
`;

const ToastIcon = styled.div`
  width: 15%;
  margin: auto;
`;

const ToastContents = styled.div`
  width: 75%;
  margin: auto;
`;

const ToastCardComponent = ({
  className,
  iconName,
  backgroundColor,
  backgroundImg,
  children
}) => (
  <Card
    width="100%"
    height="100%"
    fill={false}
    backgroundColor={backgroundColor}
    backgroundImg={backgroundImg}
    className={className}
  >
    <Container backgroundColor={backgroundColor}>
      <ToastIcon>
        <FontAwesomeIcon icon={iconName} size="2x" />
      </ToastIcon>
      <ToastContents>{children}</ToastContents>
    </Container>
  </Card>
);

export default ToastCardComponent;
