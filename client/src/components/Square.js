import React from 'react';

const box = {
  borderStyle: 'solid',
  width: '10vh', height: '10vh'
}

function Square({ row, col, colors, ...props }) {
  const
    [borderTopColor,
      borderRightColor,
      borderBottomColor,
      borderLeftColor,
      special] = colors;

  const borderWidth = special ? '3vh' : '5vh';

  return (
    <div
      style={{...box,

        gridColumn: col, // possibly undefined (when showing square in players hand)
        gridRow: row, // possibly undefined

        borderWidth,

        borderTopColor,
        borderRightColor,
        borderBottomColor,
        borderLeftColor,
      }} 
      
      {...props}
      />
  );
}

export default Square;