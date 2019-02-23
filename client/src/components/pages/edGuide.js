import React, { Component } from 'react';

import axios from 'axios';

import GameLogin from "../GameLogin";


import styled from 'styled-components';
import { offWhite } from './../../constants/colors';


const WavyBackground = styled.div`
  min-height: 100vh;
  background-image: url("/assets/wave.gif");
`;

const HeroText = styled.h1`
  text-align: center;
  font-family: ff-providence-sans-web-pro, sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 5em;
  color: ${offWhite};

  padding-top: 1em;
`;

const EdGuideContent = styled.div`
  text-align: justify;

  margin-left: 15%;
  margin-right: 15%;

  font-family: ff-providence-sans-web-pro, sans-serif;
  font-weight: 70;
  font-size: 1.3em;
  color: ${offWhite};
`;

const TextBreak = styled.div`
  border-bottom: dotted #e2e2e8;
`;


class EdGuide extends Component {
  componentDidMount() {
    axios.get('/admin')
      .then(results => console.log('axios GET /admin results', results))
      .catch(err => console.log('axios GET /admin error', err))
      ;
  }

  render() {
    return (
      <WavyBackground>
        {/*  <HeroText>Teaching Guide</HeroText>

          <EdGuideContent>
            <div className="intro-tag">Thank you for adding Styx to your history education portfolio.</div>
            <br />
            STYX is an educational, historical tribute to the MENSA-award winning board game "Lanterns" by Renegade Game Studios. In this game, players employ spacial reasoning skills to earn enough tokens to cross the River Styx and earn a gift of legendary treasure from Hades, the god of the underworld.
          <br /><br />
            This game is designed with a twofold educational purpose, and can be adapted to fit the needs of any history or social studies curriculum while also encouraging critical thinking skills for students between the ages of 9 and 18.
          <br /><br />
            This app is free to use and incorporate into a teaching curriculum in any fashion that you feel is best. Should you require pedagocical inspiration, please refer to this teaching guide as a framework upon which to base your instructional usage of STYX.
          <br /><br />
            <TextBreak/>
            <br />
            To Be Written
          </EdGuideContent> */}
        <GameLogin />
      </WavyBackground>
    );
  }
}

export default EdGuide;
