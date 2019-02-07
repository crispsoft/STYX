import React from 'react';

const opponentPaneStyle = {
  height: '70vh', width: '20vmin',
};


function SideOpponentPane({ bg }) {
  return (
    <>
      <br></br>
      <div id="playerPane" style={{...opponentPaneStyle, outlineColor: bg}}>
        <br></br>
        Opponent Panel (Side)
      </div>
    </>
  );
}

export default SideOpponentPane;