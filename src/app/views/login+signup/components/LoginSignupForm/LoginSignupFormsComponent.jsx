import React, { useState, useContext } from "react";
import styled from "styled-components";
import posed from "react-pose";
import { Formik, Form, Field } from "formik";
import { mediaSize } from "../../../../../utils/siteTools";
import { SiteContext } from "../../../../../utils/siteContext";

import LoadingSpinner from "../../../../../static/img/loaders/default.svg";
import TextInput from "../../../../shared/TextInput/TextInputComponent";
import Button from "../../../../shared/Button/ButtonComponent";
import Heading from "../../../../shared/Heading/HeadingComponent";
import Text from "../../../../shared/Text/TextComponent";

const ComponentContainer = styled.div`
  display: grid;
  margin: auto;
  width: 50vw;

  ${mediaSize.tablet`
    width: 80vw;
  `}
`;

const SlidingContainerConfig = {
  hidden: {
    x: props => (props.login ? "-100vw" : "100vw"),
    opacity: 0,
    transition: { ease: "easeInOut", duration: 500 }
  },
  shown: {
    x: 0,
    opacity: 1,
    transition: { ease: "easeInOut", duration: 500 }
  }
};

const FormContainer = styled(posed.div(SlidingContainerConfig))`
  align-self: center;
  grid-column: 1; // so that both forms can occupy same space
  grid-row: 1;
`;

const FormHeadings = styled.div`
  margin-bottom: 1em;
  width: 100%;

  text-align: center;

  ${mediaSize.phone`
    margin-bottom: 0.5em;

    text-align: left;
    & > h1 { font-size: ${props => props.theme.sizes.heading.normal} }
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
  margin-top: 1em;
`;

const FormButton = styled(Button)`
  width: 100%;

  // prevent button from collapsing when there's no content during loading
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

const ErrorText = styled(Text)`
  margin: 5px 0 1em 0;

  opacity: ${props => (props.show ? 1 : 0)};
  transition: opacity 450ms ease-in-out;

  // prevent from collapsing when there's no content during loading
  &:empty:after {
    content: "&nbsp;";
    visibility: hidden;
  }
`;

const FormSwitcher = styled.div`
  margin: auto;
  width: 25vw;
  padding-top: 1em;

  text-align: center;

  ${mediaSize.tablet`
    width: 50vw;
  `}

  ${mediaSize.phone`
    width: 100%;
  `}
`;

const FormToggleText = styled(Text)`
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }
`;

const LoginSignupFormsComponent = ({
  logIn,
  signUp,
  getNewDashboardGreeting,
  validationSchemas,
  errorTable
}) => {
  const { dispatch } = useContext(SiteContext);
  const [showLogin, toggleLogin] = useState(true);

  return (
    <ComponentContainer>
      <FormContainer pose={showLogin ? "shown" : "hidden"} login>
        <FormHeadings>
          <Heading size="big" color="grey">
            It&apos;s good to see you.
          </Heading>
          <Heading size="big" color="black">
            Log in to continue.
          </Heading>
        </FormHeadings>
        <Formik
          initialValues={{ loginEmail: "", loginPassword: "" }}
          validationSchema={validationSchemas.login}
          onSubmit={(values, actions) => {
            logIn(values.loginEmail, values.loginPassword)
              .then(() => {
                actions.setSubmitting(false);
                dispatch({
                  type: "UPDATE_DASHBOARD_GREETING",
                  data: { value: getNewDashboardGreeting() }
                });
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
                      type="email"
                      placeholder="Email"
                      outlineColor="primary"
                      formikInfo={{ field, form }}
                    />
                  )}
                </Field>

                <Field type="password" name="loginPassword">
                  {({ field, form }) => (
                    <FormInput
                      type="password"
                      placeholder="Password"
                      outlineColor="primary"
                      formikInfo={{ field, form }}
                    />
                  )}
                </Field>

                <ErrorText
                  show={hasErrors || hasStatus}
                  color="error"
                  size="small"
                >
                  {errorMsg}
                </ErrorText>

                <FormButton
                  className="loginButton"
                  label={isSubmitting ? "" : "Log In"}
                  backgroundColor="primary"
                  type="submit"
                  disabled={isSubmitting}
                />
              </FormContents>
            );
          }}
        />

        <FormSwitcher>
          <Text color="grey" size="small">
            DON&apos;T HAVE AN ACCOUNT?&nbsp;&nbsp;
          </Text>
          <FormToggleText
            color="lightBlack"
            size="small"
            onClick={() => toggleLogin(false)}
          >
            SIGN UP
          </FormToggleText>
        </FormSwitcher>
      </FormContainer>

      <FormContainer pose={!showLogin ? "shown" : "hidden"}>
        <FormHeadings>
          <Heading size="big" color="grey">
            Glad to have you on board.
          </Heading>
          <Heading size="big" color="black">
            Sign up to get started.
          </Heading>
        </FormHeadings>
        <Formik
          initialValues={{
            signupName: "",
            signupEmail: "",
            signupPassword: "",
            confirmPassword: ""
          }}
          validationSchema={validationSchemas.signup}
          onSubmit={(values, actions) => {
            signUp(values.signupName, values.signupEmail, values.signupPassword)
              .then(() => {
                actions.setSubmitting(false);
                dispatch({
                  type: "UPDATE_DASHBOARD_GREETING",
                  data: { value: getNewDashboardGreeting() }
                });
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
                      type="name"
                      placeholder="Full Name"
                      outlineColor="primary"
                      formikInfo={{ field, form }}
                    />
                  )}
                </Field>

                <Field type="email" name="signupEmail">
                  {({ field, form }) => (
                    <FormInput
                      type="email"
                      placeholder="Email"
                      outlineColor="primary"
                      formikInfo={{ field, form }}
                    />
                  )}
                </Field>
                <div className="sectionEnd" />

                <Field type="password" name="signupPassword">
                  {({ field, form }) => (
                    <FormInput
                      type="password"
                      placeholder="Password"
                      outlineColor="primary"
                      formikInfo={{ field, form }}
                    />
                  )}
                </Field>

                <Field type="password" name="confirmPassword">
                  {({ field, form }) => (
                    <FormInput
                      type="password"
                      placeholder="Confirm Password"
                      outlineColor="primary"
                      formikInfo={{ field, form }}
                    />
                  )}
                </Field>

                <ErrorText
                  show={hasErrors || hasStatus}
                  color="error"
                  size="small"
                >
                  {errorMsg}
                </ErrorText>

                <FormButton
                  className="signupButton"
                  label={isSubmitting ? "" : "Sign Up"}
                  backgroundColor="primary"
                  primary
                  type="submit"
                  disabled={isSubmitting}
                />
              </FormContents>
            );
          }}
        />

        <FormSwitcher>
          <Text color="grey" size="small">
            HAVE AN ACCOUNT?&nbsp;&nbsp;
          </Text>
          <FormToggleText
            color="lightBlack"
            size="small"
            onClick={() => toggleLogin(true)}
          >
            {" "}
            LOG IN
          </FormToggleText>
        </FormSwitcher>
      </FormContainer>
    </ComponentContainer>
  );
};

export default LoginSignupFormsComponent;
