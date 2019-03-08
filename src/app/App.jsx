import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as AppRouter, Route } from "react-router-dom";
import siteTheme, { GlobalStyles } from "../utils/siteStyles";
import { HeadContents } from "../utils/siteTools";
import { SiteContextProvider } from "../utils/siteContext";

import AppNav from "./AppNav";

const App = () => (
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
);

export default App;
