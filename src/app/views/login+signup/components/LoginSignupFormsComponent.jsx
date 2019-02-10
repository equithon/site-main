import React, { useState } from "react";
import styled from "styled-components";
import posed from "react-pose";
import { Button, TextInput, Heading } from "grommet";
import { Formik, Form, Field } from "formik";

import { mediaSize } from "../../../../utils/siteTools";
import LoadingSpinner from "../../../../static/img/loaders/default.svg";

const Container = posed.div({
  hidden: {
    x: props => (props.login ? "-100vw" : "100vw"),
    y: props => (props.login ? "0" : "-4vw"),
    opacity: 0,
    transition: { ease: "easeInOut", duration: 500 }
  },
  shown: {
    x: 0,
    y: props => (props.login ? "0" : "-4vw"),
    opacity: 1,
    transition: { ease: "easeInOut", duration: 500 }
  }
});

const ComponentContainer = styled.div`
  display: grid;
  margin: auto;
  width: 50vw;

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

  ${mediaSize.phone`
    align-self: center;
  `}
`;

const FormHeading = styled.div`
  text-align: center;
  margin-bottom: 1em;
  width: 100%;

  & > h1 {
    color: ${props => props.theme.colors.offBlack};
    font-weight: 500;
    max-width: 100%;

    ${mediaSize.tablet`
      font-size: 5vw;
      line-height: normal;
    `}

    ${mediaSize.phone`
      font-size: 8vw;
      line-height: normal;
    `}
  }

  & > .normal {
    color: ${props => props.theme.colors.offGrey};
  }

  ${mediaSize.phone`
    text-align: left;
    margin-bottom: 0.5em;
  `}
`;

const FormContents = styled(Form)`
  width: 30vw;
  height: auto;
  margin: auto;

  & div.sectionEnd {
    margin-bottom: 1em;
  }

  ${mediaSize.tablet`
    width: 55vw;
  `}

  ${mediaSize.phone`
    width: 80vw;

    & div.sectionEnd {
      margin-bottom: 0.5em;
    }
  `}
`;

const FormInput = styled(TextInput)`
  margin-top: 0.5em;
`;

const FormButton = styled(Button)`
  &:empty:after {
    content: "&nbsp;";
    visibility: hidden;
  }

  &:disabled {
    background: ${props =>
      `${
        props.theme.colors.primary
      } center / contain no-repeat url(${LoadingSpinner})`};
    opacity: 0.75;
  }
`;

const FormErrorMessage = styled.div`
  opacity: ${props => (props.show ? 1 : 0)};
  transition: opacity 450ms ease-in-out;

  color: ${props => props.theme.colors.error};
  margin-bottom: 1em;
  height: 1em;
  font-weight: 600;
  font-size: 1vw;

  ${mediaSize.tablet`
    font-size: 2vw;
  `}

  ${mediaSize.phone`
    font-size: 3vw;
  `}
`;

const FormSwitcher = styled.div`
  margin: auto;
  width: 25vw;
  padding-top: 1em;

  font-weight: 600;
  font-size: 1vw;
  text-align: center;

  color: ${props => props.theme.colors.offGrey};
  & > span {
    color: ${props => props.theme.colors.offBlack};
  }

  ${mediaSize.tablet`
    width: 50vw;
    font-size: 2vw;
  `}

  ${mediaSize.phone`
    width: 100%;
    font-size: 3.5vw;
  `}
`;

const FormToggle = styled.span`
  color: ${props => props.theme.colors.offBlack};
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }
`;

const LoginSignupFormsComponent = ({
  signUp,
  logIn,
  validationSchemas,
  errorTable
}) => {
  const [showLogin, toggleLogin] = useState(true);

  return (
    <ComponentContainer>
      <FormContainer pose={showLogin ? "shown" : "hidden"} login>
        <FormHeading>
          <Heading level="1" size="medium" margin="xsmall">
            It&apos;s good to see you.
          </Heading>
          <Heading className="normal" level="1" size="medium" margin="xsmall">
            Log in to continue.
          </Heading>
        </FormHeading>
        <Formik
          initialValues={{ loginEmail: "", loginPassword: "" }}
          validationSchema={validationSchemas.login}
          onSubmit={(values, actions) => {
            logIn(values)
              .then(() => {
                actions.setSubmitting(false);
              })
              .catch(err => {
                const errMsg =
                  err.code in errorTable
                    ? errorTable[err.code]
                    : errorTable.DEFAULT;
                actions.setSubmitting(false);
                actions.setStatus(errMsg);
              });
          }}
          render={({ touched, errors, status, isSubmitting }) => {
            // hasErrors makes sure there are errors present, and that the error is on a field that has been touched
            const hasErrors =
              Object.entries(errors).length !== 0 &&
              touched[Object.keys(errors)[0]];
            const hasStatus = status !== undefined;
            let errorMsg = hasErrors ? errors[Object.keys(errors)[0]] : "";
            errorMsg = hasStatus ? status : errorMsg;

            return (
              <FormContents>
                <Field type="email" name="loginEmail">
                  {({ field, form }) => (
                    <FormInput
                      placeholder="Email"
                      type="email"
                      {...field}
                      formikForm={form}
                    />
                  )}
                </Field>

                <Field type="password" name="loginPassword">
                  {({ field, form }) => (
                    <FormInput
                      placeholder="Password"
                      type="password"
                      {...field}
                      formikForm={form}
                    />
                  )}
                </Field>

                <FormErrorMessage show={hasErrors || hasStatus}>
                  {errorMsg}
                </FormErrorMessage>

                <FormButton
                  className="loginButton"
                  label={isSubmitting ? "" : "Log In"}
                  fill
                  primary
                  type="submit"
                  disabled={isSubmitting}
                />
              </FormContents>
            );
          }}
        />

        <FormSwitcher>
          DON&apos;T HAVE AN ACCOUNT?{" "}
          <FormToggle onClick={() => toggleLogin(false)}>SIGN UP</FormToggle>
        </FormSwitcher>
      </FormContainer>

      <FormContainer pose={!showLogin ? "shown" : "hidden"}>
        <FormHeading>
          <Heading level="1" size="medium" margin="xsmall">
            Glad to have you on board.
          </Heading>
          <Heading className="normal" level="1" size="medium" margin="xsmall">
            Sign up to get started.
          </Heading>
        </FormHeading>
        <Formik
          initialValues={{
            signupName: "",
            signupEmail: "",
            signupPassword: "",
            confirmPassword: ""
          }}
          validationSchema={validationSchemas.signup}
          onSubmit={(values, actions) => {
            signUp(values)
              .then(() => {
                actions.setSubmitting(false);
              })
              .catch(err => {
                const errMsg =
                  err.code in errorTable
                    ? errorTable[err.code]
                    : errorTable.DEFAULT;
                actions.setSubmitting(false);
                actions.setStatus(errMsg);
              });
          }}
          render={({ touched, errors, status, isSubmitting }) => {
            const hasErrors =
              Object.entries(errors).length !== 0 &&
              touched[Object.keys(errors)[0]];
            const hasStatus = status !== undefined;
            let errorMsg = hasErrors ? errors[Object.keys(errors)[0]] : "";
            errorMsg = hasStatus ? status : errorMsg;

            return (
              <FormContents>
                <Field type="text" name="signupName">
                  {({ field, form }) => (
                    <FormInput
                      placeholder="Full Name"
                      type="name"
                      {...field}
                      formikForm={form}
                    />
                  )}
                </Field>

                <Field type="email" name="signupEmail">
                  {({ field, form }) => (
                    <FormInput
                      placeholder="Email"
                      type="email"
                      {...field}
                      formikForm={form}
                    />
                  )}
                </Field>
                <div className="sectionEnd" />

                <Field type="password" name="signupPassword">
                  {({ field, form }) => (
                    <FormInput
                      placeholder="Password"
                      type="password"
                      {...field}
                      formikForm={form}
                    />
                  )}
                </Field>

                <Field type="password" name="confirmPassword">
                  {({ field, form }) => (
                    <FormInput
                      placeholder="Confirm Password"
                      type="password"
                      {...field}
                      formikForm={form}
                    />
                  )}
                </Field>

                <FormErrorMessage show={hasStatus || hasErrors}>
                  {errorMsg}
                </FormErrorMessage>

                <FormButton
                  className="signupButton"
                  label={isSubmitting ? "" : "Sign Up"}
                  fill
                  primary
                  type="submit"
                  disabled={isSubmitting}
                />
              </FormContents>
            );
          }}
        />

        <FormSwitcher>
          HAVE AN ACCOUNT?{" "}
          <FormToggle onClick={() => toggleLogin(true)}>LOG IN</FormToggle>
        </FormSwitcher>
      </FormContainer>
    </ComponentContainer>
  );
};

export default LoginSignupFormsComponent;
