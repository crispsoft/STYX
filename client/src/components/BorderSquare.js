import React from 'react';

import styled from 'styled-components';

const StyledBorderSquare = styled.div`
  border: solid;
  width: 10vh; height: 10vh;

  background: cyan;
  &:hover {
    background: red;
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