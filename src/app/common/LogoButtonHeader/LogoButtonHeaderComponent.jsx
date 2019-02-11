import React from "react";
import styled from "styled-components";
import { Box, Heading } from "grommet";

import ColorLogo from "../../../static/img/logo/logo_tiny_color.png";

const LogoContainer = styled.div`
  display: flex;
`;

const Logo = styled.img`
  margin: auto;
  max-height: 7vh;
  max-width: 7vh;

  cursor: pointer;
`;

const LogoHeading = styled(Heading)`
  margin-left: 1vw;
  display: inline-block;
  color: ${props =>
    props.size === "large" ? props.theme.colors.primary : "white"};

  cursor: pointer;
`;

const HeaderExtraContents = styled.div``;

const LogoButtonHeaderComponent = ({ logoOnClick, children }) => (
  <Box
    direction="row"
    align="center"
    width="100%"
    justify="between"
    onClick={logoOnClick}
  >
    <LogoContainer>
      <Logo src={ColorLogo} />
      <LogoHeading level="3" size="large" responsive={false}>
        Equithon
      </LogoHeading>
    </LogoContainer>
    <HeaderExtraContents>{children}</HeaderExtraContents>
  </Box>
);

export default LogoButtonHeaderComponent;
