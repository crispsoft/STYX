import React from "react";
import "./style.css";


import styled from 'styled-components';


const StyledGameInfo = styled.div`
  width: 25vw;

  overflow: hidden;

  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-content: center;
  
  border-radius: 4px;
  border: 10px solid transparent;
  border-left-width: 0;
  border-right-width: 0;
  border-image: url("/assets/greek_wave.png") 32 round;

  box-shadow: .25em 1em 5em 1em black;

  padding: 1rem;

  background-color: #CED3E3;

  animation: bob 4s ease-in-out alternate-reverse infinite;
`;

function GameInfo({ children, currRound, remRounds, ...props }) {
  let roundText = ' ';

  if (currRound && remRounds) {
    roundText = `Round ${currRound} / ${currRound + remRounds - 1}`;
  }
  else if (remRounds === 0) {
    roundText = `Final Round to Trade for Obols`;
  }
  else if (currRound === 0) {
    roundText = 'Game Over!'
  }

  return (
    <StyledGameInfo id="gameInfo" {...props} >

      <div className="dedicationCardsContainer">
        {children}
      </div>

      <div style={{marginTop:'2rem', textAlign: 'center'}}>
        <p>{roundText}</p>
      </div>

    </StyledGameInfo>
  );
}

export default GameInfo;
