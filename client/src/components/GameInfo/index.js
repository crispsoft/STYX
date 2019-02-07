import React from "react";
import "./style.css";
import Card from "@material-ui/core/Card";
import DedicationCards from "../DedicationCards";

function GameInfo(props) {
  return (
    <div>
      <Card id="gameInfo">
        <DedicationCards />
        <DedicationCards />
        <DedicationCards />
      </Card>
    </div>
  );
}

export default GameInfo;
