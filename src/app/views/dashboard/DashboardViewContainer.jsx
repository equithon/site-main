import { withFirebase } from 'react-redux-firebase';
import { compose, withHandlers } from 'recompose';
import { UserIsAuthenticated } from '../../../utils/siteAuth';


import DashboardViewComponent from './DashboardViewComponent';


// this is where we would normally do the redux stuffz


const enhance = compose(
  withFirebase,
  withHandlers({
    logOutUser: props => () => {
      return props.firebase.logout()
    }
  }),
  UserIsAuthenticated
);


export default enhance(DashboardViewComponent);
