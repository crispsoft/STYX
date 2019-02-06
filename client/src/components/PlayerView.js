import React from 'react';

const boardStyle = {
  height: '83vmin', width: '83vmin',
  outlineStyle: 'solid',
  display: 'grid',
  gridGap: '2px',
  paddingTop: '2px',
  paddingLeft: '2px',
  paddingRight: '2px',
  gridTemplateColumns: 'repeat(9, 9vmin)',
  gridTemplateRows   : 'repeat(9, 9vmin)',
  gridAutoFlow: 'row',
};


function PlayerView({ playerNum, bg, children }) {
  return (
    <>
      <h2 className="text-nowrap">{`Player ${playerNum}`}</h2>
      <div style={{...boardStyle, outlineColor: bg}}>
        {children}
      </div>
    </>
  );
}

export default PlayerView;