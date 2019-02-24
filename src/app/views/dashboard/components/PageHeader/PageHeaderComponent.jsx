import React from "react";
import styled from "styled-components";

import ColorLogo from "../../../../../static/img/logo/logo_tiny_color.png";
import Heading from "../../../../shared/Heading/HeadingComponent";

const Header = styled.header`
  height: 6vh;
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const MainContents = styled.div`
  display: flex;

  cursor: ${props => (props.clickable ? "pointer" : "auto")};
`;

const Logo = styled.img`
  max-height: 6vh;
  margin: auto;
`;

const Title = styled(Heading)`
  margin: auto 0 auto 1vw;
`;

const ExtraContents = styled.div`
  margin: auto 0;
`;

export default ({ title = "Equithon", onClickHandler, children }) => (
  <Header>
    <MainContents
      onClick={onClickHandler}
      clickable={onClickHandler !== undefined}
    >
      <Logo src={ColorLogo} />
      <Title size="normal" color="primary">
        {title}
      </Title>
    </MainContents>

    <ExtraContents>{children}</ExtraContents>
  </Header>
);
