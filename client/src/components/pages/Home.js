import React from "react";
import Hero from "../Hero";
import GameLogin from "../GameLogin";
import BeastCard from "../BeastCard";

const Home = () => (
  <div>
    <Hero />

    <GameLogin />

    <div className="hero-img">
      <div className="beasts-row">
        <BeastCard name="Cerberus" img="" description="lorem ipsum sdflsdfj;asldkfjasd;lkfjadsfkjsdlfkjsldkfjsdlakfjsadlkfjasdlkfjasldkfjalskdfj"/>
        <BeastCard name="Pegasus"/>
        <BeastCard name="Griffin"/>
        <BeastCard name="Charybdis"/>
      </div>
      <div className="beasts-row">
        <BeastCard name="Sirens"/>
        <BeastCard name="Hydra"/>
        <BeastCard name="Sphynx"/>
      </div>
    </div>

    <div className="hero-img"></div>
  </div>
);

export default Home;
