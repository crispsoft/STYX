import React from 'react';


function PlayerPane({ bg, children }) {
  return (
    <>
      <div id="playerPane"
        style={{
          outlineColor: bg,
          display: 'flex',
          
        }}
      >
        {children}
      </div>
    </>
  );
}

export default PlayerPane;