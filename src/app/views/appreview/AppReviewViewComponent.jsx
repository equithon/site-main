import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { HOME } from "../../../utils/siteRoutes";
import Barrier from "../../../static/img/misc/construction.svg";
import Heading from "../../shared/Heading/HeadingComponent";

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Img = styled.img`
  margin: 0 auto;
  max-height: 30vh;
`;

const Disclaimer = styled(Heading)`
  width: 80vw;
  text-align: center;
  margin: 0 auto;
`;

const AppReviewViewComponent = () => {
  const [shouldRedirect, updateShouldRedirect] = useState(false);

  useEffect(() => {
    const delayedRedirect = setTimeout(() => updateShouldRedirect(true), 2000);

    return () => clearTimeout(delayedRedirect);
  }, []);

  if (shouldRedirect) return <Redirect noThrow to={HOME} />;

  return (
    <Container>
      <Img src={Barrier} />
      <Disclaimer size="big" weight="normal" color="grey">
        Whoops! This page is still in the works.
      </Disclaimer>
    </Container>
  );
};

export default AppReviewViewComponent;
