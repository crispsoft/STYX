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
        </div>
    </StyledGameInfo>
  );
}

export default GameInfo;
