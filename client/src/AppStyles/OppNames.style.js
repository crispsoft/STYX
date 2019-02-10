import styled from 'styled-components';

const OppNameBase = styled.div`
  background: aliceblue;
  
  pointer-events: none;
  user-select: none;

  position: absolute;
  align-self: center;

  ${props => props.nameAnchor}: -1em;
`;


const TopName = styled(OppNameBase)`
  padding: 0.2rem 0.5rem;
  bottom: -1em;
  border-top: none;
`

const SideName = styled(OppNameBase)`
  writing-mode: vertical-lr;
  text-orientation: upright;
  padding: 0.5rem 0.2rem;
`;

const LeftName = styled(SideName)`
  right: -1em;
`;

const RightName = styled(SideName)`
  left: -1em;
`;


export {
  TopName,
  LeftName,
  RightName,
};