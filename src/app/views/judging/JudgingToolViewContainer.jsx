import React from 'react';
import { compose } from "recompose";
import { accessIfRole } from '../../../utils/siteAuth';

import JudgingToolViewComponent from './JudgingToolViewComponent';



const enhance = compose(
  accessIfRole(["JUDGE", "ORGANIZER"]),
);

// this is where we would normally do the redux stuffz
const JudgingToolViewContainer = () => <JudgingToolViewComponent />;


export default enhance(JudgingToolViewContainer);
