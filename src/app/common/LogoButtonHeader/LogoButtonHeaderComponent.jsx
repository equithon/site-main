import React from 'react';
import styled from 'styled-components';

import { Button } from '../Form/FormComponents';

import ColorLogo from '../../../static/img/logo/logo_tiny_color.png';

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
`;


const RightButton = styled(Button)`
  margin: auto 0;
  height: 4em;
  width: 10em;

  border: none;
  background-color: ${props => props.theme.colors.darkerPurple};

  color: white;
`;

const LogoButtonHeaderComponent = ({ onButtonClick }) => (
  <Container>
    <div>
      <Logo src={ColorLogo} />
      <LogoText>Equithon</LogoText>
    </div>

    <RightButton className="rightButton" onClick={onButtonClick} rounded>
      Home
    </RightButton>
  </Container>
);

export default LogoButtonHeaderComponent;
