import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";


import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import AG from './components/AG';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/ag">agaurin</Link>
            </li>
          </ul>

          <Switch>
            <Route path="/ag" component={AG} />
          </Switch>
        </div>
      </Router>
    )
  }
}


export default App;
