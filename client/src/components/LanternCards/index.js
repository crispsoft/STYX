import React from "react";

import styled from 'styled-components';

const StyleCard = styled.div`
  border: 3px solid;
  border-color: ${props => props.color};
  border-radius: 50%;
  
  color: ${props => props.color};

  height: 7vh;
  width: 7vh;

  font-size: 2.5em;
  text-align: center;
`;

function LanternCards({ color, number }) {
  return (
    <StyleCard color={color}>
      {number || 0}
    </StyleCard>
  );
}

export default LanternCards;