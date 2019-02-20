import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as AppRouter, Route } from "react-router-dom";
// import { Provider } from "react-redux";
// import { ReactReduxFirebaseProvider } from "react-redux-firebase";

// import appStore from "../ducks/store";
// import reactReduxFirebase from "../utils/setupFirebase";
import siteTheme, { GlobalStyles } from "../utils/siteStyles";
import { HeadContents } from "../utils/siteTools";
import SiteContextProvider from "../utils/siteContext";

import AppNav from "./AppNav";

const App = () => (
  // <Provider store={appStore}>
  //   <ReactReduxFirebaseProvider {...reactReduxFirebase}>
      <ThemeProvider theme={siteTheme}>
        <SiteContextProvider>
          <>
            <HeadContents />
            <GlobalStyles />
            <AppRouter>
              <Route component={AppNav} />
            </AppRouter>
          </>
        </SiteContextProvider>
      </ThemeProvider>
  //   </ReactReduxFirebaseProvider>
  // </Provider>
);

export default App;
