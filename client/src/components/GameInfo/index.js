import React from "react";
import "./style.css";
import LanternCards from "../LanternCards";
import App from "../../App";
import FavorTokens from "../FavorTokens";

import styled from 'styled-components';

const StyledGameInfo = styled.div`
  overflow: hidden;
  border-radius: 4px;
`;

function GameInfo({ children, ...props }) {
  return (
    <StyledGameInfo id="gameInfo" {...props} >
      <div className="dedicationCardsContainer">
        {children}
      </div>
      <div className="favorTokensContainer">
          <FavorTokens />
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
    </StyledGameInfo>
  );
}

export default GameInfo;
