import React from 'react';

import styled from 'styled-components';

const StyledBorderSquare = styled.div`
  border: solid;
  width: 10vh; height: 10vh;
  border-color: white;
  opacity: 0.5;

  background: transparent;
  &:hover {
    border-color: white;
    cursor: pointer;
    opacity: 1;
  }
`;


function BorderSquare({ gridRow, gridColumn, ...props }) {
  return (
      <StyledBorderSquare
        style={{ gridColumn, gridRow }}

        {...props}
      />
    );
}

export default BorderSquare;