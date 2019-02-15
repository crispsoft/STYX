import React from "react";
import Hero from "../Hero";

const Home = () => (
  <div>
    <div className="hero">
      <div className="hero-img">
        <h1 className="hero-text">STYX</h1>
        <div class="round">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
      
      <div className="hero-img">
        <div className="game-login-container">
            <div className="join-game">
              <h2 className="join-game-text">Join Game</h2>
              <form>
                <input type="text"></input>
                <submit id="join-game-btn"></submit>
              </form>
            </div>
            <div className="start-game">
              <h2>Start Game</h2>
              <button id="start-game-btn">Go</button>
            </div>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
