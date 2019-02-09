import React, { useState } from "react";
import styled from "styled-components";
import posed from "react-pose";
import { Button, TextInput } from "grommet";
import { Formik, Form, Field } from "formik";
import { mediaSize } from "../../../../utils/siteTools";

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

const FormHeading = styled.h1`
  font-size: ${props => props.theme.sizes.header.desktop};
  font-weight: 400;
  line-height: normal;
  text-align: center;

  margin-bottom: 1em;

  & > .normal {
    color: ${props => props.theme.colors.offGrey};
  }

  ${mediaSize.tablet`
    font-size: ${props => props.theme.sizes.header.tablet};
  `}

  ${mediaSize.phone`
    font-size: ${props => props.theme.sizes.header.phone};
    text-align: left;
    margin-bottom: 0.5em;
  `}
`;

const FormContents = styled(Form)`
  width: 30vw;
  height: auto;
  margin: auto;

  & div.sectionEnd {
    margin-bottom: 2vw;
  }

  ${mediaSize.tablet`
    width: 55vw;

    & div.sectionEnd {
      margin-bottom: 2vw;
    }
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

const FormToggle = styled.span`
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
          <div>It&apos;s good to see you.</div>
          <div className="normal">Log in to continue.</div>
        </FormHeading>
        <Formik
          initialValues={{ loginEmail: "", loginPassword: "" }}
          validationSchema={validationSchemas.login}
          validateOnChange={false}
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
          render={({ errors, status, isSubmitting }) => {
            const hasErrors = Object.entries(errors).length !== 0;
            const hasStatus = status !== undefined;

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
                  {hasStatus ? status : errors[Object.keys(errors)[0]]}
                </FormErrorMessage>

                <Button
                  className="loginButton"
                  label="Log In"
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
          <div>Glad to have you on board.</div>
          <div className="normal">Sign up to get started.</div>
        </FormHeading>
        <Formik
          initialValues={{
            signupName: "",
            signupEmail: "",
            signupPassword: "",
            confirmPassword: ""
          }}
          validationSchema={validationSchemas.signup}
          validateOnChange={false}
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
          render={({ errors, status, isSubmitting }) => {
            const hasErrors =
              status !== "" || Object.entries(errors).length !== 0;
            const hasStatus = status !== undefined;

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
                  {hasStatus ? status : errors[Object.keys(errors)[0]]}
                </FormErrorMessage>

                <Button
                  className="signupButton"
                  label="Sign Up"
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
