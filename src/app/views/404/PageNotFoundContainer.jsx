import React from "react";
import styled from "styled-components";
import Barrier from "../../../static/img/misc/pagenotfound.svg";
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
  margin: 0 auto;
`;


const PageNotFoundViewContainer = () => (
  <Container>
    <Img src={Barrier} />
    <Disclaimer size="big" weight="normal" color="grey">
      Looks like you&apos;re a bit lost.
    </Disclaimer>
  </Container>
);


export default PageNotFoundViewContainer;
