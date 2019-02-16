import React from "react";
import styles from "./style.css";

function Hero() {
  return (
    <div className="hero">
      <div className="hero-img">
        <h1 className="hero-text">STYX</h1>
        <br />
        <div className="game-lore">
          <div className="intro-tag">Welcome, brave adventurers, to the shores of the River Styx.</div>
        <br />
        Hades, the Greek God of the Underworld, has grown bored with his role as jailer. He has promised great riches to those who can successfully cross the river and enter into the underworld. Discover ancient wonders and learn about the beasts and creaures of Greek myth; earn their favor, and Hades' treasure will be yours!
        </div>
        <div class="round">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

export default Hero;
