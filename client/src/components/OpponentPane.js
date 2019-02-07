import React from 'react';


function OpponentPane({ bg }) {
  return (
    <>
      <div id="playerPane" style={{ outlineColor: bg }}>
        Opponent Panel
      </div>
    </>
  );
}

export default OpponentPane;