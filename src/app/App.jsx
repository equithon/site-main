import * as React from 'react';
import { BrowserRouter as AppRouter, Route } from 'react-router-dom';
import AppNav from './AppNav';

const App = () => {
  return (
    <AppRouter>
      <Route component={AppNav} />
    </AppRouter>
  );
}

export default App;
