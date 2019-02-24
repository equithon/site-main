import React from 'react';
import { compose } from "recompose";

import ScheduleViewComponent from './ScheduleViewComponent';



const enhance = compose(
);

const ScheduleViewContainer = () => <ScheduleViewComponent />;


export default enhance(ScheduleViewContainer);
