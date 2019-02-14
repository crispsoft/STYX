import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import App from './App';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Hero from "./components/Hero";




const LandingPage = () => (
  <Router>
    <Switch>
      <Route path="/game" component={App} /> {/*only game will show up*/}
      <Route component={IncludeNav} />
    </Switch>
  </Router>
);

const IncludeNav = () => (
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
    
    <Route path="/about" component={About} />
    <Route path="/" component={Home} />
  </div>
);


export default LandingPage;
