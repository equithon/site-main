import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// COMPONENTS
import DashboardContainer from './dashboard/DashboardContainer';
import LoginContainer from './login+signup/LoginContainer';


// DATA
import * as ROUTES from '../utils/siteRoutes';

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path={ROUTES.HOME} component={DashboardContainer} />
        <Route exact path={ROUTES.SIGNUP_LOGIN} component={LoginContainer} />
      </div>
    </Router>
  );
}

export default App;
