import styled from 'styled-components';

import { offWhite, medGrey } from './../constants/colors';

const BasePane = styled.div`
  position: fixed;

  display: flex;
  justify-content: center;
  align-items: center;

  border-style: solid;
  border-width: ${props => props.selected ? '3px' : '1px' };
  border-color: ${props => props.selected ? offWhite : 'black' };
  background-color: ${medGrey};
  padding: 0.7rem;
  border-radius: 3px;
  
  border: 10px solid transparent;
  border-left-width: 0;
  border-right-width: 0;
  border-image: url("/assets/greek_wave.png") 32 round;
`;


const HorizPane = styled(BasePane)`
  flex-flow: row nowrap;
`;

const VertPane = styled(BasePane)`
  flex-flow: column nowrap;

  width: 8.5%;
  height: 60vh;
`;


const TopPane = styled(HorizPane)`
  top: 0;  
  width: 60vh; /*! equal to vert panel height */
  min-width: 40%;
  height: 8.5vw; max-height: 11%; 
`;

const BottomPane = styled(HorizPane)`
  bottom: 0;
  width: 60vw; 
  height: 8.5vw; max-height: 12%;
`;

const LeftPane = styled(VertPane)`
  left: 0;
`;

const RightPane = styled(VertPane)`
  right: 0;
`;


const CenterPane = styled.div`
  width: 80%;
  display: flex;
  
  justify-content: space-evenly;
  align-items: center;
`;


export {
  TopPane, 
  RightPane, 
  BottomPane, 
  LeftPane, 

  CenterPane,
};