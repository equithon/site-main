import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { compose, withHandlers } from 'recompose';
import { UserIsAuthenticated } from '../../../utils/siteAuth';


import DashboardViewComponent from './DashboardViewComponent';


const enhance = compose(
  connect(
    (state) => ({
        profile: state.firebase.profile // profile passed as props.profile
      })
  ),
  withFirebase,
  withHandlers({
    logOutUser: props => () => props.firebase.logout()
  }),
  UserIsAuthenticated
);


export default enhance(DashboardViewComponent);
