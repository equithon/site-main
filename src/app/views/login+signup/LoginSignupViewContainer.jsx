import { connect } from "react-redux";
import { withFirebase } from "react-redux-firebase";
import { compose, withHandlers, withProps } from "recompose";
import * as Yup from "yup";
import { UserIsNotAuthenticated } from "../../../utils/siteAuth";
import { loginActions } from "../../../ducks/actions";
import LoginSignupViewComponent from "./LoginSignupViewComponent";

const errorTable = {
  "auth/user-not-found": "There was a problem logging you in.",
  "auth/email-already-exists":
    "This email is already associated with an account.",
  DEFAULT: "An error occurred. Please try again."
};

const dispatchUpdateDashboardInfo = ({ dispatch }) => dashInfo => {
  dispatch(loginActions.updateDash(dashInfo));
};

const logInUser = ({ firebase }) => ({ loginEmail, loginPassword }) =>
  firebase.login({ email: loginEmail, password: loginPassword });
const signUpUser = ({ firebase }) => ({
  signupName,
  signupEmail,
  signupPassword
}) =>
  firebase
    .createUser(
      { email: signupEmail, password: signupPassword },
      { name: signupName, role: "HACKER" }
    )
    .catch(err => {
      console.log(err);
    });
const loginValidationSchema = Yup.object().shape({
  loginEmail: Yup.string()
    .email("Make sure your email is typed correctly.")
    .required("Make sure to provide an email."),
  loginPassword: Yup.string().required("Make sure to provide a password.")
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
    .oneOf([Yup.ref("signupPassword"), null], "Make sure the passwords match.")
    .required("Make sure to confirm your password.")
});

// const greetings = [
//   'Hi there',
//   'Hello',
//   'Welcome back',
//   'Hey'
// ];

const subgreetings = {
  HACKER: "Get ready to create change!",
  VOLUNTEER: "Thanks for volunteering!",
  JUDGE: "We're honoured to have you as a judge!"
};

const getDashboardGreeting = () => {
  let greeting = "Good morning";
  const hourOfDay = parseFloat(new Date().getHours());
  if (hourOfDay >= 12 && hourOfDay < 18) {
    greeting = "Good afternoon";
  } else if (hourOfDay >= 18) {
    greeting = "Good evening";
  }

  return greeting;
};

const getDashboardSubgreeting = userRole => {
  let subgreeting;
  let showCustomSubgreeting = Math.random() > 0.7;

  if (showCustomSubgreeting) {
    switch (userRole) {
      case "ORGANIZER":
        showCustomSubgreeting = false;
        break;

      case "GENERAL":
        showCustomSubgreeting = false;
        break;

      default:
        subgreeting = subgreetings[userRole];
    }
  }

  if (!showCustomSubgreeting) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const curDate = new Date();
    const eventDate = new Date(curDate.getFullYear(), 4, 3);
    const daysUntilEvent = Math.ceil(
      (eventDate.getTime() - curDate.getTime()) / oneDay
    );
    subgreeting = daysUntilEvent
      ? `There are ${daysUntilEvent} days until Equithon!`
      : "Today's the day! Happy hacking!";
  }

  return subgreeting;
};

const getDashboardToast = firstTimeUser => ({
  iconName: "lightbulb",
  backgroundColor: "primary",
  contents: firstTimeUser
    ? "Say hi to your dashboard! Feel free to take a look around."
    : "Welcome back! Everything you need as an attendee is here."
});

const getDashboardInfo = firstTimeUser => ({
  greetingInfo: {
    greeting: getDashboardGreeting(),
    subgreeting: getDashboardSubgreeting(firstTimeUser)
  },
  toastInfo: getDashboardToast(firstTimeUser)
});

const enhance = compose(
  withFirebase,
  withHandlers({
    logInUser,
    signUpUser,
    dispatchUpdateDashboardInfo
  }),
  withProps({
    validationSchemas: {
      login: loginValidationSchema,
      signup: signupValidationSchema
    },
    errorTable,
    getDashboardInfo
  }),
  connect(({ firebase: { profile } }) => ({ profile })),
  UserIsNotAuthenticated
);

export default enhance(LoginSignupViewComponent);
