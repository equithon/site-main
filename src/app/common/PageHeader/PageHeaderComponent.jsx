import React from "react";
import styled from "styled-components";

import ColorLogo from "../../../static/img/logo/logo_tiny_color.png";

const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const MainContents = styled.div`
  height: 100%;
  display: flex;

  cursor: pointer;
`;

const Logo = styled.img`
  max-height: 100%;
  margin: auto;
`;

const Title = styled.span`
  margin-left: 1vw;
`;

const ExtraContents = styled.div``;

const LogoButtonHeaderComponent = ({
  title = "Equithon",
  logoClickHandler,
  children
}) => (
  <Container>
    <MainContents onClick={logoClickHandler}>
      <Logo src={ColorLogo} />
      <Title>{title}</Title>
    </MainContents>

    <ExtraContents>{children}</ExtraContents>
  </Container>
);

export default LogoButtonHeaderComponent;
