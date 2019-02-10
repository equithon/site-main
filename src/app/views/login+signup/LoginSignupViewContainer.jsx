import { withFirebase } from "react-redux-firebase";
import { compose, withHandlers, withProps } from "recompose";
import * as Yup from "yup";
import { UserIsNotAuthenticated } from "../../../utils/siteAuth";

import LoginSignupViewComponent from "./LoginSignupViewComponent";

const errorTable = {
  "auth/user-not-found": "There was a problem logging you in.",
  "auth/email-already-exists":
    "This email is already associated with an account.",
  DEFAULT: "An error occurred. Please try again."
};

const logInUser = props => ({ loginEmail, loginPassword }) =>
  props.firebase.login({ email: loginEmail, password: loginPassword });

const signUpUser = props => ({ signupName, signupEmail, signupPassword }) =>
  props.firebase.createUser(
    { email: signupEmail, password: signupPassword },
    { name: signupName, role: "hacker" }
  );

const loginValidationSchema = Yup.object().shape({
  loginEmail: Yup.string()
    .email("Make sure your email is typed correctly.")
    .required("Make sure to provide an email."),
  loginPassword: Yup.string().required("Make sure your password is correct.")
});

const signupValidationSchema = Yup.object().shape({
  signupName: Yup.string()
    .min(2, "Make sure to provide your full name.")
    .max(40, "Make sure your name is less than 40 characters.")
    .required("No name provided."),
  signupEmail: Yup.string()
    .email("Make sure your email is typed correctly.")
    .required("Make sure to provide an email."),
  signupPassword: Yup.string()
    .min(8, "Make sure your password is at least 8 characters.")
    .required("Make sure to provide a password."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("signupPassword"), null], "Make sure the passwords matche.")
    .required("Make sure to confirm your password.")
});

const enhance = compose(
  withFirebase,
  withHandlers({
    logInUser,
    signUpUser
  }),
  withProps({
    validationSchemas: {
      login: loginValidationSchema,
      signup: signupValidationSchema
    },
    errorTable
  }),
  UserIsNotAuthenticated
);

export default enhance(LoginSignupViewComponent);
