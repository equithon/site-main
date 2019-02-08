import { withFirebase } from 'react-redux-firebase';
import { compose, withHandlers } from 'recompose';

import { UserIsNotAuthenticated } from '../../../utils/siteAuth';


import LoginSignupViewComponent from './LoginSignupViewComponent';


const enhance = compose(
  withFirebase,
  withHandlers({
    logInUser: props => ({ email, password }) => props.firebase.login({ email, password }),
    signUpUser: props => ({email, password, name}) => props.firebase.createUser({ email, password }, { name, role: 'hacker' })
  }),
  UserIsNotAuthenticated
);


export default enhance(LoginSignupViewComponent);
