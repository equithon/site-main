import * as React from "react";
import { Grommet as ThemeProvider } from "grommet";
import { BrowserRouter as AppRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

import appStore from "../ducks/store";
import reactReduxFirebase from "../utils/setupFirebase";
import siteStyles from "../utils/siteStyles";
import { GlobalStyles } from "../utils/siteTools";

import AppNav from "./common/AppNav/AppNav";

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
