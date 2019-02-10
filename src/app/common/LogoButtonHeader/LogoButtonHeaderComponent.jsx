import React from "react";
import styled from "styled-components";
import { Box, Heading } from "grommet";

import ColorLogo from "../../../static/img/logo/logo_tiny_color.png";

const Logo = styled.img`
  max-height: 7vh;
  max-width: 7vh;

  cursor: pointer;
`;

const LogoHeading = styled(Heading)`
  margin-left: 1vw;
  color: ${props =>
    props.size === "large" ? props.theme.colors.primary : "white"};

  cursor: pointer;
`;

const LogoButtonHeaderComponent = () => (
  <Box
    direction="row"
    align="center"
    fill={false}
    width="small"
    onClick={() => window.open("https://equithon.org", "_self")}
  >
    <Logo src={ColorLogo} />
    <LogoHeading level="3" size="large" responsive={false}>
      Equithon
    </LogoHeading>
  </Box>
);

export default LogoButtonHeaderComponent;
