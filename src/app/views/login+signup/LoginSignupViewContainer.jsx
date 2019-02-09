import { withFirebase } from 'react-redux-firebase';
import { compose, withHandlers } from 'recompose';

import { UserIsNotAuthenticated } from '../../../utils/siteAuth';


import LoginSignupViewComponent from './LoginSignupViewComponent';


const enhance = compose(
  withFirebase,
  withHandlers({
    logInUser: props => ({ loginEmail, loginPassword }) => props.firebase.login({ email: loginEmail, password: loginPassword }),
    signUpUser: props => ({signupName, signupEmail, signupPassword}) => props.firebase.createUser({ email: signupEmail, password: signupPassword }, { name: signupName, role: 'hacker' })
  }),
  UserIsNotAuthenticated
);


export default enhance(LoginSignupViewComponent);
