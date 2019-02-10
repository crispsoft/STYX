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

const TopOppPanel = styled(HorizPanel)`
  height: 90%;
`;

const VertPanel = styled(PanelBase)`
  /* width: 90%; */
  flex-flow: column nowrap;
`;

const LeftOppPanel = VertPanel;
const RightOppPanel = VertPanel;



const PlayerPanelTiles = HorizPanel;

const PlayerPanel = HorizPanel;


export {
  TopOppPanel,
  LeftOppPanel,
  RightOppPanel,

  PlayerPanel,
  PlayerPanelTiles,
};