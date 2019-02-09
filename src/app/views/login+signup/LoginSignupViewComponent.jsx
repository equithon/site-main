import React, { useState } from 'react';
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

const LoginSignUpContainer = styled.div`
  position: relative;
  z-index: 1;
  margin: auto;
  width: 30vw;
`;


const LoginSignupViewComponent = ({ logInUser, signUpUser }) => {

  const [showLogin, toggleLogin] = useState(true);

  return (
    <ViewContainer>

      <LogoButtonHeader onButtonClick={() => window.open('https://equithon.org', '_self')} />

      <LoginSignUpContainer>
        <LoginFormComponent logIn={logInUser} show={showLogin} toggleView={() => toggleLogin(false)}/>
        <SignUpFormComponent signUp={signUpUser} show={!showLogin} toggleView={() => toggleLogin(true)}/>
      </LoginSignUpContainer>
      {/*
      */}

      <WavesComponent />
    </ViewContainer>
  );
};


export default LoginSignupViewComponent;
