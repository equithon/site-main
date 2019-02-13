import React from "react";
import styled from "styled-components";
import { Box } from "grommet";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import onClickOutside from "react-onclickoutside";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled(Box)`
  position: relative;
  margin: auto;
  border-radius: ${props => props.theme.app.border.radius};
  color: ${props => props.theme.colors.offWhite};
`;

const CloseButton = styled.button`
  position: absolute;
  top: -1vw;
  right: -1vw;
  width: 2vw;
  height: 2vw;
  border: none;
  border-radius: 50%;

  cursor: pointer;

  transition: transform 150ms ease-in-out;
  transform: scale(1.01);
  &:hover {
    transform: scale(1.2);
  }
`;

const ModalComponent = ({
  className,
  gridArea,
  backgroundColor,
  onClickClose,
  children
}) => (
  <Container
    className={className}
    gridArea={gridArea}
    background={backgroundColor}
  >
    <CloseButton onClick={() => onClickClose()}>
      <FontAwesomeIcon icon="times" size="1x" color="grey" />
    </CloseButton>
    {children}
  </Container>
);

const enhance = compose(
  onClickOutside,
  withRouter
);

export default enhance(ModalComponent);
