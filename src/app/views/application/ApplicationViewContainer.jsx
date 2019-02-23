import { compose } from "recompose";
import ApplicationViewComponent from './ApplicationViewComponent';
import { accessIfAuthenticated } from '../../../utils/siteAuth';
import { connectSiteContext } from "../../../utils/siteContext";




const mapContextStateToProps = ({ state: { firebase } }) => ({
  updateApp: newAppInfo => console.log('updating application', newAppInfo),
  submitApp: firebase.submitApplication,
});

const enhance = compose(
  accessIfAuthenticated,
  connectSiteContext(mapContextStateToProps),
);

export default enhance(ApplicationViewComponent);
