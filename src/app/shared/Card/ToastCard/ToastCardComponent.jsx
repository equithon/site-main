import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Card from "../CardComponent";

const ToastCard = styled(Card)`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 4fr;
  grid-template-areas: "icon contents";
  grid-column-gap: 1em;
  padding: 1.5em 1em;
  justify-content: space-between;
`;

const Icon = styled.div`
  margin: auto;
`;

const Contents = styled.div`
  margin: auto;
`;

export default ({
  className,
  icon,
  color = "white",
  backgroundColor = "primary",
  backgroundImg,
  onClickHandler,
  children
}) => (
  <ToastCard
    className={className}
    color={color}
    backgroundColor={backgroundColor}
    backgroundImg={backgroundImg}
    onClickHandler={onClickHandler}
  >
    <Icon>
      {" "}
      <FontAwesomeIcon icon={icon} size="2x" />{" "}
    </Icon>
    <Contents> {children} </Contents>
  </ToastCard>
);
