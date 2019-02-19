import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import * as serviceWorker from "./utils/registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// TODO: Determine if we want offline support. If so, change
//       the below code to register() (more details: http://bit.ly/CRA-PWA)
serviceWorker.unregister();
