import { withFirebase } from 'react-redux-firebase';
import { compose, withHandlers } from 'recompose';

import { UserIsNotAuthenticated } from '../../../utils/siteAuth';


import LoginSignupViewComponent from './LoginSignupViewComponent';


const enhance = compose(
  withFirebase,
  withHandlers({
    logInUser: props => (email, password) => {
      return props.firebase.login({ email, password })
    },
    signUpUser: props => (credentials, profile) => {
      return props.firebase.createUser({ credentials, profile })
    }
  }),
  UserIsNotAuthenticated
);


export default enhance(LoginSignupViewComponent);
