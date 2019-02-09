import React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import Input from '../../../common/Input/Input';
import Button from '../../../common/Button/Button';

const Container = posed.div({
  hidden: {
    x: '100vw',
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
  position: absolute;
  top: 0; left: 0;
  z-index: 2;
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


const SignupForm = styled(Form)`
  width: 30vw;
  margin: auto;
  height: auto;
`;

const SignupInput = styled(Input)`
  width: 25vw;
`;

const SignupButton = styled(Button)`
  margin: 2vh 2.5vw 0 2.5vw;
  width: 25vw;
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


const LoginFormComponent = ({ signUp, show, toggleView }) => (
  <FormContainer pose={show ? 'shown' : 'hidden'}>
    <FormHeader>
      <div>Glad to have you on board.</div>
      <div className="normal">Sign up to get started.</div>
    </FormHeader>
    <Formik
      initialValues={{signupName: '', signupEmail: '', signupPassword: '', confirmPassword: ''}}
      onSubmit={(values, actions) => {
        signUp(values)
        .then(() => {
          actions.setSubmitting(false);
        })
        .catch(err => {
          console.log(err);
          actions.setSubmitting(false);
        })
      }}
      render={({ errors, status, touched, isSubmitting }) => (

        <SignupForm>
          <Field type="text" name="signupName">
            {({ field, form }) => (
              <SignupInput placeholder="Full Name" type="name" {...field} formikForm={form}/>
            )}
          </Field>
          <ErrorMessage name="signupName" component="div" />

          <Field type="email" name="signupEmail">
            {({ field, form }) => (
              <SignupInput placeholder="Email" type="email" {...field} formikForm={form}/>
            )}
          </Field>
          <ErrorMessage name="signupEmail" component="div" />

          <Field type="password" name="signupPassword">
            {({ field, form }) => (
              <SignupInput placeholder="Password" type="password" {...field} formikForm={form} />
            )}
          </Field>
          <ErrorMessage name="signupPassword" component="div" />

          <Field type="password" name="confirmPassword">
            {({ field, form }) => (
              <SignupInput placeholder="Confirm Password" type="password" {...field} formikForm={form}/>
            )}
          </Field>
          <ErrorMessage name="confirmPassword" component="div" />

          <SignupButton className="signupButton" type="submit" disabled={isSubmitting} text="Sign Up" />
        </SignupForm>

      )}
    />

    <FormSwitcher>
      HAVE AN ACCOUNT? <Toggle onClick={() => toggleView()}>LOG IN</Toggle>
    </FormSwitcher>
  </FormContainer>
);

export default LoginFormComponent;
