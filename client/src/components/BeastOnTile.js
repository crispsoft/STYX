import React from 'react';

import styled, { keyframes } from 'styled-components';


const revealBeastAfterSplash = keyframes`
  0% {
    transform: scale(1.3);
    filter: blur(10px);
  }

  100% {
    transform: none;
    filter: none;
    opacity: 1;
  }
`;

const BeastImgBase = styled.img`
  position: absolute;
  margin: auto;
  object-fit: cover;
  opacity: 0;

  animation: ${revealBeastAfterSplash} 1s 1.5s ease forwards;
`;


const BeastImgHoriz = styled(BeastImgBase)`
  left: 0; right: 0;
  width: 66%;
  height: 33%;
`;

const BeastImgVert = styled(BeastImgBase)`
  bottom: 0; top: 0;
  width: 33%; 
  height: 66%;
`;


const BeastImgTop = styled(BeastImgHoriz)`
  top: 0;
  object-position: bottom;
`;

const BeastImgBottom = styled(BeastImgHoriz)`
  bottom: 0;
  object-position: top;
`;

const BeastImgLeft = styled(BeastImgVert)`
  left: 0;
  object-position: right;
`;

const BeastImgRight = styled(BeastImgVert)`
  right: 0;
  object-position: left;
`;


function BeastOnTile({ src, side }) {

  switch (side) {
    case 'top':
      return <BeastImgTop src={src} />

    case 'right':
      return <BeastImgRight src={src} />

    case 'bottom':
      return <BeastImgBottom src={src} />

    case 'left':
      return <BeastImgLeft src={src} />

    default:
      return null;
  }

}

export default BeastOnTile;