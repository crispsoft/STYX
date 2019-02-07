import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
// Delete this before merging
import GameInfo from "./components/GameInfo"

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
