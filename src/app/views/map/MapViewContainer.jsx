import React from 'react';
import { compose } from "recompose";

import MapViewComponent from './MapViewComponent';


const enhance = compose(
);

const MapViewContainer = () => <MapViewComponent />;


export default enhance(MapViewContainer);
