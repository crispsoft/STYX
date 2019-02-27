import styled from 'styled-components';

const PanelBase = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const HorizPanel = styled(PanelBase)`
  flex-flow: row nowrap;
`;

export const TopOppPanel = styled(HorizPanel)`
  height: 90%;
`;

const VertPanel = styled(PanelBase)`
  /* width: 90%; */
  flex-flow: column nowrap;
`;

export const LeftOppPanel = VertPanel;
export const RightOppPanel = VertPanel;


export const PlayerPanel = HorizPanel;

export const PlayerPanelTilesGrid = styled.div`
  display: grid;
  flex-grow: 1;
  justify-items: center;
  grid-template-rows: repeat(1, 10vh);
  grid-template-columns: repeat(3, minmax(10vh, 1fr));
`;
