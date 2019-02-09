import React from 'react';
import styled from 'styled-components';

import Button from '../Button/Button';

import ColorLogo from '../../../static/img/logo/logo_tiny_color.png';
import { mediaSize } from '../../../utils/siteTools';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 8vh;
`;

const Logo = styled.img`
  vertical-align: top;
  max-height: 100%;
`;

const LogoText = styled.span`
  margin-left: 1vw;

  color: ${props => props.theme.colors.darkerPurple};

  font-size: ${props => props.theme.sizes.subHeader.desktop};
  font-weight: 600;
  line-height: 8vh;

  ${mediaSize.tablet`
    font-size: ${props => props.theme.sizes.subHeader.tablet};
  `}

  ${mediaSize.phone`
    font-size: ${props => props.theme.sizes.subHeader.phone};
  `}
`;


const RightButton = styled(Button)`
  margin: auto 0;
  width: 7em;
  height: 2.5em;
  
  background-color: ${props => props.theme.colors.darkerPurple};
`;

const LogoButtonHeaderComponent = ({ onButtonClick }) => (
  <Container>
    <div>
      <Logo src={ColorLogo} />
      <LogoText>Equithon</LogoText>
    </div>

    <RightButton className="rightButton" onClick={onButtonClick} rounded hover text="Home" />
  </Container>
);

export default LogoButtonHeaderComponent;
