import React from 'react';
import styled from 'styled-components';


import LogoButtonHeader from '../../common/LogoButtonHeader/LogoButtonHeaderComponent';
import LoginSignupFormsComponent from './components/LoginSignupFormsComponent';
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
    <LoginSignupFormsComponent logIn={logInUser} signUp={signUpUser} />
    <WavesComponent />

  </ViewContainer>
);


export default LoginSignupViewComponent;
