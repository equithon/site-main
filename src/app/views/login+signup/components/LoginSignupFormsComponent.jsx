import React, { useState } from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { mediaSize } from '../../../../utils/siteTools';

import Input from '../../../common/Input/Input';
import Button from '../../../common/Button/Button';


const Container = posed.div({
  hidden: {
    x: props => props.login ? '-100vw' : '100vw',
    y: props => props.login ? '0' : '-2vw',
    opacity: 0,
    transition: { ease: 'easeInOut', duration: 500 }
  },
  shown: {
    x: 0,
    y: props => props.login ? '0' : '-2vw',
    opacity: 1,
    transition: { ease: 'easeInOut', duration: 500 }
  }
});


const ComponentContainer = styled.div`
  display: grid;
  margin: auto;
  width: 35vw;

  ${mediaSize.tablet`
    width: 80vw;
  `}

  ${mediaSize.phone`
    width: 80vw;
  `}
`;


const FormContainer = styled(Container)`
  grid-column: 1;
  grid-row: 1;
`;


const FormHeader = styled.h1`
  font-size: ${props => props.theme.sizes.header.desktop};
  font-weight: normal;
  text-align: center;

  margin-bottom: 5vh;

  & > .normal {
    color: ${props => props.theme.colors.offGrey};
  }

  ${mediaSize.tablet`
    font-size: ${props => props.theme.sizes.header.tablet};
  `}

  ${mediaSize.phone`
    font-size: ${props => props.theme.sizes.header.phone};
    text-align: left;
  `}
`;


const LoginSignupForm = styled(Form)`
  width: 30vw;
  height: auto;
  margin: auto;

  & div.sectionEnd {
    margin-bottom: 2vw;
  }


  ${mediaSize.tablet`
    width: 55vw;

    & div.sectionEnd {
      margin-bottom: 4vw;
    }
  `}

  ${mediaSize.phone`
    width: 80vw;

    & div.sectionEnd {
      margin-bottom: 6vw;
    }
  `}
`;


const LoginSignupInput = styled(Input)`
  width: 100%;
  height: 2.8em;
  margin-bottom: 1vw;

  ${mediaSize.tablet`
    height: 7vw;
    margin-bottom: 2vw;
  `}

  ${mediaSize.phone`
    height: 11vw;
    margin-bottom: 3vw;
  `}

`;


const LoginSignupButton = styled(Button)`
  background-color: ${props => props.theme.colors.secondary};
  width: 100%;
  height: 2.5em;

  ${mediaSize.tablet`
    height: 7vw;
  `}

  ${mediaSize.phone`
    height: 11vw;
  `}
`;


const FormSwitcher = styled.div`
  margin: auto;
  width: 25vw;
  padding-top: 1em;

  font-weight: 600;
  font-size: 1.2vw;
  text-align: center;

  color: ${props => props.theme.colors.offGrey};
  & > span {
    color: ${props => props.theme.colors.offBlack};
  }

  ${mediaSize.tablet`
    width: 50vw;
    font-size: 2.5vw;
  `}

  ${mediaSize.phone`
    width: 100%;
    font-size: 3.5vw;
  `}
`;


const FormToggle = styled.span`
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }
`;



const LoginSignupFormsComponent = ({ signUp, logIn }) => {

  const [showLogin, toggleLogin] = useState(true);

  return (
    <ComponentContainer>

      <FormContainer pose={showLogin ? 'shown' : 'hidden'} login>
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
          render={({ isSubmitting }) => (

            <LoginSignupForm>
              <Field type="email" name="loginEmail">
                {({ field, form }) => (
                  <LoginSignupInput placeholder="Email" type="email" {...field} formikForm={form}/>
                )}
              </Field>
              <ErrorMessage name="loginEmail" component="div" />

              <Field type="password" name="loginPassword">
                {({ field, form }) => (
                  <LoginSignupInput placeholder="Password" type="password" {...field} formikForm={form} />
                )}
              </Field>
              <ErrorMessage name="loginPassword" component="div" />
              <div className="sectionEnd" />

              <LoginSignupButton className="loginButton" type="submit" disabled={isSubmitting} text="Log In" />
            </LoginSignupForm>

          )}
        />

        <FormSwitcher>
          DON&apos;T HAVE AN ACCOUNT? <FormToggle onClick={() => toggleLogin(false)}>SIGN UP</FormToggle>
        </FormSwitcher>

      </FormContainer>

      <FormContainer pose={!showLogin ? 'shown' : 'hidden'}>
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
          render={({ isSubmitting }) => (

            <LoginSignupForm>
              <Field type="text" name="signupName">
                {({ field, form }) => (
                  <LoginSignupInput placeholder="Full Name" type="name" {...field} formikForm={form}/>
                )}
              </Field>
              <ErrorMessage name="signupName" component="div" />

              <Field type="email" name="signupEmail">
                {({ field, form }) => (
                  <LoginSignupInput placeholder="Email" type="email" {...field} formikForm={form}/>
                )}
              </Field>
              <ErrorMessage name="signupEmail" component="div" />
              <div className="sectionEnd" />

              <Field type="password" name="signupPassword">
                {({ field, form }) => (
                  <LoginSignupInput placeholder="Password" type="password" {...field} formikForm={form} />
                )}
              </Field>
              <ErrorMessage name="signupPassword" component="div" />

              <Field type="password" name="confirmPassword">
                {({ field, form }) => (
                  <LoginSignupInput placeholder="Confirm Password" type="password" {...field} formikForm={form}/>
                )}
              </Field>
              <ErrorMessage name="confirmPassword" component="div"/>
              <div className="sectionEnd" />

              <LoginSignupButton className="signupButton" type="submit" disabled={isSubmitting} text="Sign Up" />
            </LoginSignupForm>

          )}
        />

        <FormSwitcher>
          HAVE AN ACCOUNT? <FormToggle onClick={() => toggleLogin(true)}>LOG IN</FormToggle>
        </FormSwitcher>

      </FormContainer>

    </ComponentContainer>
  );
};

export default LoginSignupFormsComponent;
