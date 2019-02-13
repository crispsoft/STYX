import React from "react";
import "./style.css";
import Card from "@material-ui/core/Card";
import DedicationCards from "../DedicationCards";
import LanternCards from "../LanternCards";
import App from "../../App";

function GameInfo({ values, actives }) {
  return (
    <Card id="gameInfo">
      <div className="dedicationCardsContainer">
        <DedicationCards type={'1-all' }
          active={actives && actives[0]} value={values && values[0]} />

        <DedicationCards type={'3-pair'}
          active={actives && actives[1]} value={values && values[1]} />

        <DedicationCards type={'4-kind'}
          active={actives && actives[2]} value={values && values[2]} />
      </div>
      <div>
        <div className="lanternCardsContainer">
          <LanternCards color={App.colorMap[0]} />
        </div>
        <div className="lanternCardsContainer">
          <LanternCards color={App.colorMap[1]} />
          <LanternCards color={App.colorMap[2]} />
          <LanternCards color={App.colorMap[3]} />
          <LanternCards color={App.colorMap[4]} />
        </div>
        <div className="lanternCardsContainer">
          <LanternCards color={App.colorMap[5]} />
          <LanternCards color={App.colorMap[6]} />
        </div>
      </div>
    </Card>
  );
}

export default GameInfo;
