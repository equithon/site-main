import React from 'react';
import { compose } from "recompose";
import { accessIfRole } from '../../../utils/siteAuth';

import AttendeesViewComponent from './AttendeesViewComponent';



const enhance = compose(
  accessIfRole(["VOLUNTEER", "ORGANIZER"]),
);

// this is where we would normally do the redux stuffz
const AttendeesViewContainer = () => <AttendeesViewComponent />;


export default enhance(AttendeesViewContainer);
