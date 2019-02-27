import React from "react";


import styled, { css } from 'styled-components';
import { medGrey, favorColorsMap } from './../../constants/colors';


const FavorProgressRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
`;

const SingleFavorProgress = styled.div`
  border-radius: 50%;
  border: 1px solid;
  
  height: 2vh;
  width: 2vh;
  margin: 2px;

  ${props =>
    props.color && css`
      border-color: ${props.color};
      background: ${props.color};
    `
  }
`;

const QuestionMarkOverlay = styled.p`
  position: absolute;
  left: 0; right: 0;
  bottom: 0;
  margin: 0 auto;
  font-size: 3vh;
  line-height: 3vh;
  font-family: ff-providence-sans-web-pro, sans-serif;
`;

function ConditionalObols({ type, colors, selected } = {}) {

  switch (type) {

    case "1-all": {
      return (<>

        <FavorProgressRow>
          <SingleFavorProgress color={(selected[0] && colors[0] > 0) ? favorColorsMap[0] : undefined} />
          <SingleFavorProgress color={(selected[2] && colors[2] > 0) ? favorColorsMap[2] : undefined} />
          <SingleFavorProgress color={(selected[4] && colors[4] > 0) ? favorColorsMap[4] : undefined} />
          <SingleFavorProgress color={(selected[6] && colors[6] > 0) ? favorColorsMap[6] : undefined} />
        </FavorProgressRow>

        <FavorProgressRow>
          <SingleFavorProgress color={(selected[1] && colors[1] > 0) ? favorColorsMap[1] : undefined} />
          <SingleFavorProgress color={(selected[3] && colors[3] > 0) ? favorColorsMap[3] : undefined} />
          <SingleFavorProgress color={(selected[5] && colors[5] > 0) ? favorColorsMap[5] : undefined} />
        </FavorProgressRow>

      </>);
    }

    case "3-pair": {

      const pairIndices = colors.reduce((workingArray, currQty, idx) => {
        if (selected[idx] && currQty >= 2) {
          workingArray.push(idx);
        }
        return workingArray;
      }, []);

      const favorColors = pairIndices.map(indexVal => favorColorsMap[indexVal]);
      const isAmbiguous = pairIndices.length > 3;

      return (<>

        <FavorProgressRow>
          <SingleFavorProgress color={isAmbiguous ? medGrey : favorColors[0]} />
          <SingleFavorProgress color={isAmbiguous ? medGrey : favorColors[1]} />
          <SingleFavorProgress color={isAmbiguous ? medGrey : favorColors[2]} />
        </FavorProgressRow>

        <FavorProgressRow>
          <SingleFavorProgress color={isAmbiguous ? medGrey : favorColors[0]} />
          <SingleFavorProgress color={isAmbiguous ? medGrey : favorColors[1]} />
          <SingleFavorProgress color={isAmbiguous ? medGrey : favorColors[2]} />
        </FavorProgressRow>

        {isAmbiguous && <QuestionMarkOverlay>???</QuestionMarkOverlay>}

      </>);
    }

    case "4-kind": {

      const quadIndices = colors.reduce((workingArray, currQty, idx) => {
        if (selected[idx] && currQty >= 4) {
          workingArray.push(idx);
        }
        return workingArray;
      }, []);

      const favorColors = quadIndices.map(indexVal => favorColorsMap[indexVal]);
      const isAmbiguous = quadIndices.length > 1;

      return (<>

        <FavorProgressRow>
          <SingleFavorProgress color={isAmbiguous ? medGrey : favorColors[0]} />
          <SingleFavorProgress color={isAmbiguous ? medGrey : favorColors[0]} />
        </FavorProgressRow>

        <FavorProgressRow>
          <SingleFavorProgress color={isAmbiguous ? medGrey : favorColors[0]} />
          <SingleFavorProgress color={isAmbiguous ? medGrey : favorColors[0]} />
        </FavorProgressRow>

        {isAmbiguous && <QuestionMarkOverlay>?</QuestionMarkOverlay>}

      </>);
    }
    default: ;
  }

}

export default ConditionalObols;
