import React from 'react';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import Input from '../../../common/Input/Input';
import Button from '../../../common/Button/Button';

const FormHeader = styled.h1`
  font-size: ${props => props.theme.sizes.header.desktop};
  font-weight: normal;
  text-align: center;

  margin-bottom: 5vh;

  & .normal {
    color: ${props => props.theme.colors.offGrey};
  }
`;


const LoginForm = styled(Form)`
  width: 25vw;
  margin: auto;
  height: 50vh;
`;

const LoginFormInput = styled(Input)`

`;

const LogInButton = styled(Button)`
  margin-top: 2vh;
  background-color: ${props => props.theme.colors.secondary};
`;


const LoginFormComponent = ({ logIn }) => (
  <div>
    <FormHeader>
      <div>Welcome back.</div>
      <div className="normal">Log In to continue.</div>
    </FormHeader>
    <Formik
      initialValues={{email: '', password: ''}}
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
          <Field type="email" name="email" render={() => <LoginFormInput placeholder="Email" />} />
          <ErrorMessage name="email" component="div" />

          <Field type="password" name="password" render={() => <LoginFormInput placeholder="Password" inputType="password" />} />
          <ErrorMessage name="password" component="div" />

          <LogInButton className="loginButton" type="submit" disabled={isSubmitting} text="Log In" />
        </LoginForm>

      )}
    />
  </div>
);

export default LoginFormComponent;
