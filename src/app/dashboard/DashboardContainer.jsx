import React from 'react';
import DashboardComponent from './DashboardComponent';


// this is where we would normally do the redux stuffz


const testUserName = 'Bob';

const DashboardContainer = () => <DashboardComponent userName={testUserName} />;


export default DashboardContainer;
