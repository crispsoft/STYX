import React, { Children } from 'react';

const playerPaneStyle = {
  height: '20vmin', width: '70vw',
};


function PlayerPane({ bg, children }) {
  return (
    <>
      <br></br>
      <div id="playerPane" style={{...playerPaneStyle, outlineColor: bg}}>
        <br></br>
        {children}
      </div>
    </>
  );
}

export default PlayerPane;