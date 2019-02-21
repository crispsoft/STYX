import React from "react";
import "./style.css";

function GameLogin() {
  return (
    <div className="hero-img">
      <div className="game-login-container">
        <div className="join-game">
          <h2 className="join-game-text">Start Game</h2>
          <p className="join-game-text">Please enter your password to begin a game.</p>
          <form>
            <input type="text" placeholder="Enter Code Here"/>
            <button id="start-game-btn" type="submit">Start</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GameLogin;
