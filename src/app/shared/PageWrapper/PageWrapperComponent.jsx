import React, { Children, useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useScrollYPosition } from "react-use-scroll-position";
import { mediaSize } from "../../../utils/siteTools";
import { HOME } from "../../../utils/siteRoutes";

import Heading from "../Heading/HeadingComponent";


const navigateBack = (history, onClickBackHandler) => () => {
  const goBack = (history.location.state && history.location.state.cameFromApp);
  if(goBack) history.goBack();
  else history.replace(HOME);

  if(onClickBackHandler) onClickBackHandler();
};



const PageWrapper = styled.div`
  width: 80vw;
  margin: 10vh auto;

  ${mediaSize.tablet`
    margin: 7vh auto;
  `};
`;

const HeadingContainer = styled.div`
  position: relative;
  height: 3em;
  left: 0;
  margin-bottom: 0.5em;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  & > * {
    // center child elements vertically
    margin: auto 0;
  }
`;

const BackButtonContainer = styled.div`
  position: fixed;
  height: 3em;
  top: 10vh;
  left: 5vw;
  margin-bottom: 0.5em;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  & > * {
    // center child elements vertically
    margin: auto 0;
  }

  will-change: transform;
  transition: transform 250ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform: translateY(0);

  ${mediaSize.tablet`
    top: auto;
    bottom: 3vh;
    left: 10vw;
    width: 80vw;

    & > * {
      margin: auto;
    }

    &.hidden {
      transform: translateY(20vh);
    }
  `};
`;

const BackButton = styled.div`

  color: ${props => props.theme.colors.black};
  cursor: pointer;

  will-change: transform;
  transition: transform 250ms ease-in-out;
  transform: scale(1);
  &:hover {
    transform: scale(1.1);
  }
`;

export default withRouter(({
  className,
  title,
  history,
  onClickBackHandler,
  children
}) => {

  const scrollY = useScrollYPosition(); // this hook throttles scroll updates automatically for performance
  const [prevScrollY, updatePrevScrollPos] = useState(scrollY);
  const [showBackButton, toggleShowBackButton] = useState(true);

  const scrolledDown = scrollY - prevScrollY > 0;
  const scrolledUp = scrollY - prevScrollY < -10;

  if (scrolledDown) toggleShowBackButton(false);
  else if (scrolledUp) toggleShowBackButton(true);

  if (scrollY !== prevScrollY) updatePrevScrollPos(scrollY);

  return (
    <PageWrapper className={className}>
      <BackButtonContainer className={showBackButton ? "" : "hidden"}>
        <BackButton onClick={navigateBack(history, onClickBackHandler)}>
          <FontAwesomeIcon icon="chevron-circle-left" size="2x" />
        </BackButton>
      </BackButtonContainer>

      <HeadingContainer>
        <Heading size="big" color="black">
          {title}
        </Heading>
      </HeadingContainer>

      {/* Enforce having only one child (the page itself) */}
      {Children.only(children)}
    </PageWrapper>
  );
});
