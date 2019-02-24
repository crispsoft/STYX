import React from "react";

import ConditionalObols from "../ConditionalObols";

import styled, { css, keyframes } from 'styled-components';
import { medGrey } from './../../constants/colors';

const bounce = keyframes`
  from {
    transform: scale(0.9);
  }
  to {
    transform: scale(1.1);
  }
`;

const ObolExchange = styled.div`
  position: relative;

  width: 11vh;
  height: 11vh;

  background: ${medGrey};
  border: 3px solid black;
  border-radius: 3px;

  text-align: center;
  font-size: 3em;
  font-family: ff-providence-sans-web-pro, sans-serif;
  font-weight: 700;
  font-style: normal;
  

  pointer-events: ${props => props.active ? 'all' : 'none'};

  ${props =>
    props.active && css`
       animation: ${bounce} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) alternate-reverse infinite;

       cursor: pointer;

       &:hover {
         /* border-color: #375170; */
       }
   `}
`;

const ConditionContainer = styled.div`
  background: #526D78;
  border: 3px solid;
  border-color: inherit;
  border-radius: 3px;
  position: absolute;
  height: 5vh;
  width: 10vh;

  bottom: -2.5vh;
  left: 0; right: 0;
  margin: auto;
`;



function DedicationCards({ value, type, ...props }) {
  return (
    <ObolExchange {...props}>
      {value || ''}
      <ConditionContainer>
        <ConditionalObols type={type} />
      </ConditionContainer>
    </ObolExchange>
  );
}

export default DedicationCards;
