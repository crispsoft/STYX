import styled from 'styled-components';


const BasePane = styled.div`
  position: fixed;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid black;
  background: aliceblue;
`;


const HorizPane = styled(BasePane)`
  flex-flow: row nowrap;
`;

const VertPane = styled(BasePane)`
  flex-flow: column nowrap;

  width: 8.5vw;
  height: 60vh;
`;


const TopPane = styled(HorizPane)`
  top: 0;  
  width: 60vh; 
  height: 8.5vw; max-height: 10vh; 
`;

const BottomPane = styled(HorizPane)`
  bottom: 0;
  width: 60vw; 
  height: 8.5vw; max-height: 12vh;
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
  justify-content: space-around;

  & > * {
    width: ${props => props.childW};
    height: ${props => props.childH};
    margin: auto;
  }
`;


export {
  TopPane, 
  RightPane, 
  BottomPane, 
  LeftPane, 
};