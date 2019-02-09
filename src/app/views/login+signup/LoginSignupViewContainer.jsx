import { withFirebase } from "react-redux-firebase";
import { compose, withHandlers, withProps } from "recompose";
import * as Yup from "yup";
import { UserIsNotAuthenticated } from "../../../utils/siteAuth";

import LoginSignupViewComponent from "./LoginSignupViewComponent";

const errorTable = {
  "auth/user-not-found": "There was a problem logging you in.",

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
    .email("Invalid email.")
    .required("No email specified."),
  loginPassword: Yup.string().required("No password provided!")
});

const signupValidationSchema = Yup.object().shape({
  signupName: Yup.string()
    .min(2, "Name is too short D:")
    .max(40, "Name is too long D:")
    .required("No name provided."),
  signupEmail: Yup.string()
    .email("Invalid email.")
    .required("No email provided."),
  signupPassword: Yup.string()
    .min(8, "Your password should be at least 8 characters.")
    .required("No password provided!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("signupPassword"), null], "Passwords don't match D:")
    .required("Password confirmation is required!")
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
