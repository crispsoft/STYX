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

  /* Chrome (72.0.3626.96) would not vertically center name without this */
  /* FireFox (65.0) would without this. But possibly not per spec due to position: absolute?
  https://www.w3.org/TR/css-flexbox-1/#abspos-items */
  top: 50%; transform: translate(0,-50%);
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