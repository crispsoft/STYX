import React from 'react';

const boardStyle = {
  height: '81vmin', width: '81vmin',
  // height: '45vmin', width: '45vmin',
  outlineStyle: 'solid',
  display: 'grid',
  gridGap: 0,
  gridTemplateColumns: 'repeat(9, 9vmin)',
  // gridTemplateColumns: 'repeat(9, 5vmin)',
  gridTemplateRows   : 'repeat(9, 9vmin)',
  // gridTemplateRows   : 'repeat(9, 5vmin)',
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