import styled from 'styled-components';

const FullScreenView = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  user-select: none;
  background-color: #375170;
`;

const Points = styled.p`
  font-family: ff-providence-sans-web-pro, sans-serif;
  font-weight: 700;
  font-style: normal;
`;

export {
  FullScreenView, Points
};

export * from './Panes.style';
export * from './Panels.style';
export * from './OppNames.style';
