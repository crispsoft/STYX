import React from "react";
import styles from "./style.css";

function GameLogin() {
  return (
    <div className="hero-img">
      <div className="game-login-container">
        <div className="join-game">
          <h2 className="join-game-text">Join Game</h2>
          <form>
            <input type="text" />
            <submit id="join-game-btn" />
          </form>
        </div>
        <div className="start-game">
          <h2>Start Game</h2>
          <button id="start-game-btn">Go</button>
        </div>
      </div>
    </div>
  );
}

export default GameLogin;
