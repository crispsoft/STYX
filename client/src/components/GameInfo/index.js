import React from "react";
import "./style.css";
import Card from "@material-ui/core/Card";
import DedicationCards from "../DedicationCards";
import LanternCards from "../LanternCards";
import App from "../../App";
import FavorTokens from "../FavorTokens";

function GameInfo(props) {
  return (
    <div>
      <Card id="gameInfo">
        <div className="dedicationCardsContainer">
          <DedicationCards />
          <DedicationCards />
          <DedicationCards />
        </div>
        <div className="favorTokensContainer">
          <FavorTokens />
        </div>
        <div>
          <div className="lanternCardsContainer">
            <LanternCards color={App.colorMap[0]}/>
          </div>
          <div className="lanternCardsContainer">
            <LanternCards color={App.colorMap[1]}/>
            <LanternCards color={App.colorMap[2]}/>
            <LanternCards color={App.colorMap[3]}/>
            <LanternCards color={App.colorMap[4]}/>
          </div>
          <div className="lanternCardsContainer">
            <LanternCards color={App.colorMap[5]}/>
            <LanternCards color={App.colorMap[6]}/>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default GameInfo;
