import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import App from './App';
import Home from './components/pages/Home';
import About from './components/pages/About';


const LandingPage = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <Link to="/game">Play!</Link>
        </li>
      </ul>

      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/game" component={App} />
    </div>
  </Router>
);


export default LandingPage;
