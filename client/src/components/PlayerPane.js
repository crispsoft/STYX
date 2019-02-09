import React from 'react';


function PlayerPane({ bg, children }) {
  return (
    <>
      <div id="playerPane"
        style={{
          outlineColor: bg,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}
      >
        {children}
      </div>
    </>
  );
}

export default PlayerPane;