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
  /* width: 10vh; */
  width: 100%;
  /* height: 10vh; */
  height: 100%;

  grid-row   : ${props => props.gridRow};
  grid-column: ${props => props.gridColumn};


  ${props =>
    props.enabled && css`
      &:hover {
        transform: scale(1.2);
        box-shadow: 2px;
      }
    `
  }

  ${props =>
    props.selected && css`
      animation: ${squareBounce} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) alternate-reverse infinite;

      cursor: crosshair
      /* &::after {
        width: 10px;
        height: 10px;
        background: red;
      } */
    `
  }

  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;

export const StatusSummary = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  width: 17vw;
  height: 15vh;
  padding: 0.3rem;
  background: ${colors.lightWhite};
`;

export * from './Panes.style';
export * from './Panels.style';
export * from './OppNames.style';
