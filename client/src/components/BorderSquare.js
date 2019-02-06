import React from 'react';

import './BorderSquare.css'

const box = {
  borderStyle : 'solid',
  width: '9vmin', height: '9vmin'
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