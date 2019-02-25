import React from 'react';
import { compose } from "recompose";
import { accessIfAuthenticated } from '../../../utils/siteAuth';

import HelpViewComponent from './HelpViewComponent';



const enhance = compose(
  accessIfAuthenticated,
);

// this is where we would normally do the redux stuffz
const HelpViewContainer = () => <HelpViewComponent />;


export default enhance(HelpViewContainer);
