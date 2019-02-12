import React from "react";
import "./style.css";
import Card from "@material-ui/core/Card";
import DedicationCards from "../DedicationCards";
import LanternCards from "../LanternCards";

function GameInfo(props) {
  return (
    <div>
      <Card id="gameInfo">
        <div className="dedicationCardsContainer">
          <DedicationCards />
          <DedicationCards />
          <DedicationCards />
        </div>
        <div>
          <div className="lanternCardsContainer">
            <LanternCards />
          </div>
          <div className="lanternCardsContainer">
            <LanternCards />
            <LanternCards />
            <LanternCards />
            <LanternCards />
          </div>
          <div className="lanternCardsContainer">
            <LanternCards />
            <LanternCards />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default GameInfo;
