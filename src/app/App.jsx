import * as React from 'react';
import { BrowserRouter as AppRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { ThemeProvider } from 'styled-components';

import appStore from '../ducks/store';
import reactReduxFirebase from '../utils/setupFirebase';
import * as siteStyles from '../utils/siteStyles';
import { GlobalStyles } from '../utils/siteTools';

import AppNav from './common/AppNav/AppNav';



const App = () => (
  <Provider store={appStore}>
    <ReactReduxFirebaseProvider {...reactReduxFirebase}>
      <ThemeProvider theme={siteStyles}>
        <>
          <GlobalStyles />
          <AppRouter>
            <Route component={AppNav} />
          </AppRouter>
        </>
      </ThemeProvider>
    </ReactReduxFirebaseProvider>
  </Provider>
);

export default App;
