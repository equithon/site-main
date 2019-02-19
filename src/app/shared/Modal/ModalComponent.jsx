import React from "react";
import styled from "styled-components";
import onClickOutside from "react-onclickoutside";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mediaSize } from "../../../utils/siteTools";

import Card from "../Card/CardComponent";

const CloseButton = styled.button`
  position: absolute;
  top: -1vw;
  right: -1vw;
  width: 2vw;
  height: 2vw;

  border: none;
  border-radius: 50%;

  cursor: pointer;

  will-change: transform;
  transition: transform 150ms ease-in-out;
  transform: scale(1.01);
  &:hover {
    transform: scale(1.2);
  }

  ${mediaSize.tablet`
    top: -1.5vw;
    right: -1.5vw;
    width: 4vw;
    height: 4vw;
  `};

  ${mediaSize.phone`
    top: -2vw;
    right: -2vw;
    width: 6vw;
    height: 6vw;
  `};
`;

const enhance = compose(
  onClickOutside,
  withRouter
);

export default enhance(({
  className,
  backgroundColor,
  backgroundImg,
  onClickCloseHandler,
  children
}) => (
  <Card
    className={className}
    backgroundColor={backgroundColor}
    backgroundImg={backgroundImg}
  >
    <CloseButton onClick={onClickCloseHandler}>
      <FontAwesomeIcon icon="times" size="1x" color="grey" />
    </CloseButton>

    {children}
  </Card>
));
