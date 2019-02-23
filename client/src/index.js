import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import LandingPage from "./LandingPage";

ReactDOM.render(<LandingPage />, document.getElementById("root"));
registerServiceWorker();
