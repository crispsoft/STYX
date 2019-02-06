import React from 'react';

const box = {
  borderStyle: 'solid',
  width: '9vmin', height: '9vmin',
  // width: '5.2vmin', height: '5.2vmin',
}

function Square({ row, col, colors, ...props }) {
  const
    [borderTopColor,
      borderRightColor,
      borderBottomColor,
      borderLeftColor,
      special] = colors;

  const borderWidth = special ? '3.2vmin' : '4.6vmin';
  // const borderWidth = special ? '2vmin' : '2.6vmin';

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