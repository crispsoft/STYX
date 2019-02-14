import styled, { css, keyframes } from 'styled-components';

export const FullScreenView = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  user-select: none;
  background-color: #375170;
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

export const Square = styled.div`
  border-style: solid;
  width: 10vh;
  height: 10vh;

  border-color: ${props => props.colors};

  border-width: ${props => props.special ? '3.7vh' : '5vh'};

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


export * from './Panes.style';
export * from './Panels.style';
export * from './OppNames.style';
