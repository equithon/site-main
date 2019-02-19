import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { mediaSize } from "../../../../utils/siteTools";
import Card from "../CardComponent";

const ToastCard = styled(Card)`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 4fr;
  grid-column-gap: 1em;
  grid-template-areas: "icon contents";
  justify-content: space-between;

  ${mediaSize.tablet`
    font-size: 0.8em;
  `};

  ${mediaSize.phone`
  `};
`;

const Icon = styled.div`
`;

const Contents = styled.div`
`;

export default ({
  className,
  icon,
  color = 'white',
  backgroundColor = 'primary',
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
    <Icon> <FontAwesomeIcon icon={icon} size="2x" /> </Icon>
    <Contents> {children} </Contents>
  </ToastCard>
);
