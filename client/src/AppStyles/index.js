import styled, { css, keyframes } from 'styled-components';

import * as colors from './../constants/colors';

export const FullScreenView = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  user-select: none;
  
  background-image: url("/assets/wave.gif");
`;

export const Points = styled.p`
  font-family: ff-providence-sans-web-pro, sans-serif;
  font-weight: 700;
  font-style: normal;
  margin-bottom: 0;
`;

const squareBounce = keyframes`
  from {
    transform: scale(0.9);
  }
  to {
    transform: scale(1.1);
  }
`;


export const LakeTile = styled.div`
  border-width: 3.7vh;
  border-style: solid;

  border-color: ${props => props.colors};
  width: 10vh;
  height: 10vh;

  grid-row   : ${props => props.gridRow};
  grid-column: ${props => props.gridColumn};

  ${props =>
    props.enabled && !props.selected && css`
      box-shadow: 3px 3px 3px black;

      &:hover {
        box-shadow: 5px 5px 5px black;
        transform: scale(1.2);
        cursor: pointer;
      }
    `
  }

  ${props =>
    props.selected && css`
      box-shadow: 5px 5px 5px black;
      animation: ${squareBounce} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) alternate-reverse infinite;

      cursor: url('./assets/redo-alt-solid.svg'), crosshair;
    `
  }

  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;



export const StatusSummary = styled.div`
  font-family: Imprima, sans serif;
  border-radius: 3px;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  width: 17vw;
  height: 15vh;
  padding: 0.3rem;
  background: ${colors.lightWhite};
`;

export const BoardGrid = styled.div`
  width : calc(70vh+12px);
  height: calc(70vh+12px);
  outline: solid;
  outline-color: ${colors.offWhite};
  display: grid;
  grid-gap: 2px;
  padding: 2px;
  grid-template-columns: repeat(7, 10vmin);
  grid-template-rows: repeat(7, 10vmin);
`;

export const BoardSquare = styled.div`
  position: relative;
  grid-row: ${props => props.gridRow};
  grid-column: ${props => props.gridColumn};
`;

export const GrainOverlay = styled.img`
  width: 100%;
  height: 100%;

  position: absolute;

  left: 0;  right: 0;
  top: 0;  bottom: 0;
  margin: auto;
  
  opacity: .5;
`;

export * from './Panes.style';
export * from './Panels.style';
export * from './OppNames.style';
