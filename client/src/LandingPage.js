import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import styled from "styled-components";

import App from "./App";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import EdGuide from "./components/pages/edGuide";
import Hero from "./components/Hero";
import edGuide from "./components/pages/edGuide";

const NavBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #91a2bb;
  width: 100%;
  height: 3em;

  justify-content: space-around;
  text-decoration: none;
  font-family: "Imprima", sans-serif;
  `;
  
  const StyledLink = styled(Link)`
  color: #375170;
  &:hover {
    color: white;
    text-decoration: none;
  }
`;

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
    <NavBar id="nav-bar">
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/game">Play!</StyledLink>
      <StyledLink to="/about">About Us</StyledLink>
      <StyledLink to="/ed">Teaching Guide</StyledLink>
    </NavBar>

    <Route path="/about" component={About} />
    <Route exact path="/" component={Home} />
    <Route path="/ed" component={EdGuide} />
  </div>
);

export default LandingPage;
