import React from "react";
import "./style.css";

import styled, { css, keyframes } from 'styled-components';

const bounce = keyframes`
  from {
    transform: scale(0.9);
  }
  to {
    transform: scale(1.1);
  }
`;



const StyledTrade = styled.div`
  pointer-events: ${props => props.active ? 'all' : 'none' };

  ${props => 
    props.active && css`
       animation: ${bounce} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) alternate-reverse infinite;

       cursor: pointer;

       &:hover {
         border-color: #375170;
       }
   `}
`;

function DedicationCards({ value, type, ...props }) {
  return (
    <StyledTrade className="dedicationCard" {...props}>
      {value || ''}
      <div id="condition" style={{
        fontSize: '1.5rem',
        wordWrap: 'nowrap',
        borderColor: 'inherit'
      }}>{type}</div>
    </StyledTrade>
  );
}

export default DedicationCards;
