import React from 'react';
import styled from 'styled-components';

import LogoButtonHeader from '../../common/LogoButtonHeader/LogoButtonHeaderComponent';
import LoginFormComponent from './components/LoginFormComponent';
import SignUpFormComponent from './components/SignUpFormComponent';
import WavesComponent from './components/WavesComponent';


const ViewContainer = styled.div`
  height: 90vh;
  padding: 5vh 10vw;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;


const LoginSignupViewComponent = ({ logInUser, signUpUser }) => (
  <ViewContainer>

    <LogoButtonHeader onButtonClick={() => window.open('https://equithon.org', '_self')} />

    <LoginFormComponent logIn={logInUser} />
    {/* <SignUpFormComponent signUp={signUpUser} />
    */}

    <WavesComponent />
  </ViewContainer>
);

export default LoginSignupViewComponent;
