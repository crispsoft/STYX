import React from 'react';

import './BorderSquare.css'

const box = {
  borderStyle : 'solid',
  width: '9vmin', height: '9vmin',
  // width: '5.2vmin', height: '5.2vmin',
}

function BorderSquare({ gridRow, gridColumn, ...props }) {
  return (
      <div className="BorderSquare"
        style={{...box,

          gridColumn, 
          gridRow   , 
        }}

        {...props}
      />
    );
}

export default BorderSquare;