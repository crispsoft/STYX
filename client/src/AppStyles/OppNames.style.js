import styled from 'styled-components';

import { offWhite } from './../constants/colors';

const OppNameBase = styled.div`
  background: ${offWhite};
  
  user-select: none;

  position: absolute;
  align-self: center;

  font-family: ff-providence-sans-web-pro, sans-serif;
  font-weight: 700;
  font-style: normal;

  ${props => props.nameAnchor}: -1em;
`;


const TopName = styled(OppNameBase)`
  padding: 0.1rem 0.5rem;
  bottom: -1em;
  border-top: none;
`

const SideName = styled(OppNameBase)`
  writing-mode: vertical-lr;
  text-orientation: upright;
  padding: 0.5rem 0.2rem;

  /* Chrome (72.0.3626.96) would not vertically center name without this */
  /* FireFox (65.0) would, but possibly not as per spec due to position: absolute? (as part of OppNameBase)
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