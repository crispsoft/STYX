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
        <BeastCard />
        <BeastCard />
        <BeastCard />
        <BeastCard />
      </div>
      <div className="beasts-row">
        <BeastCard />
        <BeastCard />
        <BeastCard />
      </div>
    </div>
  </div>
);

export default Home;
