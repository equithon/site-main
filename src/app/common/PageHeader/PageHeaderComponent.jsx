import React from "react";
import styled from "styled-components";

import ColorLogo from "../../../static/img/logo/logo_tiny_color.png";
import Heading from "../Heading/HeadingComponent";

const Container = styled.div`
  height: 6vh;
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

const Title = styled(Heading)`
  margin: auto 0 auto 1vw;
`;

const ExtraContents = styled.div``;

const PageHeader = ({ title = "Equithon", onClickHandler, children }) => (
  <Container>
    <MainContents onClick={onClickHandler}>
      <Logo src={ColorLogo} />
      <Title size="med" color="primary">
        {title}
      </Title>
    </MainContents>

    <ExtraContents>{children}</ExtraContents>
  </Container>
);

export default PageHeader;
