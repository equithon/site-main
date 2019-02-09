import React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import Input from '../../../common/Input/Input';
import Button from '../../../common/Button/Button';

const Container = posed.div({
  hidden: {
    x: '-100vw',
    opacity: 0,
    transition: { ease: 'easeInOut', duration: 500 }
  },
  shown: {
    x: 0,
    opacity: 1,
    transition: { ease: 'easeInOut', duration: 500 }
  }
});

const FormContainer = styled(Container)`
`;

const FormHeader = styled.h1`
  font-size: ${props => props.theme.sizes.header.desktop};
  font-weight: normal;
  text-align: center;

  margin-bottom: 5vh;

  & > .normal {
    color: ${props => props.theme.colors.offGrey};
  }
`;


const LoginForm = styled(Form)`
  width: 25vw;
  margin: auto;
  height: auto;
`;

const LoginFormInput = styled(Input)`

`;

const LogInButton = styled(Button)`
  margin-top: 2vh;
  background-color: ${props => props.theme.colors.secondary};
`;

const FormSwitcher = styled.div`
  margin: auto;
  width: 20vw;
  padding: 1em 0 25vh 0;

  font-weight: 600;
  font-size: 0.8em;
  text-align: center;

  color: ${props => props.theme.colors.offGrey};
  & > span {
    color: ${props => props.theme.colors.offBlack};
  }
`;

const Toggle = styled.span`
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }
`;


const LoginFormComponent = ({ logIn, show, toggleView }) => (
  <FormContainer pose={show ? 'shown' : 'hidden'}>
    <FormHeader>
      <div>Welcome back.</div>
      <div className="normal">Log in to continue.</div>
    </FormHeader>
    <Formik
      initialValues={{loginEmail: '', loginPassword: ''}}
      onSubmit={(values, actions) => {
        logIn(values)
        .then(() => {
          actions.setSubmitting(false);
        })
        .catch(err => {
          console.log(err);
          actions.setSubmitting(false);
        })
      }}
      render={({ errors, status, touched, isSubmitting }) => (

        <LoginForm>
          <Field type="email" name="loginEmail">
            {({ field, form }) => (
              <LoginFormInput placeholder="Email" type="email" {...field} formikForm={form}/>
            )}
          </Field>
          <ErrorMessage name="loginEmail" component="div" />

          <Field type="password" name="loginPassword">
            {({ field, form }) => (
              <LoginFormInput placeholder="Password" type="password" {...field} formikForm={form} />
            )}
          </Field>
          <ErrorMessage name="loginPassword" component="div" />

          <LogInButton className="loginButton" type="submit" disabled={isSubmitting} text="Log In" />
        </LoginForm>

      )}
    />

    <FormSwitcher>
      DON'T HAVE AN ACCOUNT? <Toggle onClick={() => toggleView()}>SIGN UP</Toggle>
    </FormSwitcher>
  </FormContainer>
);

export default LoginFormComponent;
