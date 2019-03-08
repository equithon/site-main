import React from "react";
import styled from "styled-components";
import LoadingSpinnerColor from "../../../static/img/loaders/default_color.svg";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  
  display: flex;
`;

const Loader = styled.img`
  margin: auto;
`;

const PageLoadingContainer = () => (
  <Container>
    <Loader src={LoadingSpinnerColor} />
  </Container>
);

export default PageLoadingContainer;
