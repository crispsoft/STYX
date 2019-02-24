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

          <h3>The Benefits of Greek Mythology</h3>

          <br /><br />
          Experts agree that the teaching of ancient Greek mythology can serve as a foundation for childrens' understanding of history, narrative structure, and the use of narratives as means of understanding the world. MENSA suggests that children as young as Kindergarten age could benefit from exposure to Greek myths, though we believe that the depth of content illustrated by the mythology in STYX would be better suited for schoolchildren grades four through seven. 
          <br /><br />
          MENSA's sample lesson plan for teaching Greek mythology can be found <a href="https://www.mensaforkids.org/teach/lesson-plans/an-introduction-to-greek-mythology/">here.</a> We suggest introducing STYX as a learning tool during lesson two, or whenever your own lesson plan focuses on the introduction of the differences between the Grecian goddesses and gods.
          <br /><br />

          <h3>The Importance of Spacial Reasoning</h3>

          < br /><br />
          According to a PBS report, spacial reasoning skills coordinate strongly to children's early achievement in math and "strongly predict" who will pursue STEM careers later in life. Early exposure to spacial skills -- such as playing with blocks or reading and manipulating a map or globe -- can jumpstart a child's education in this regard and grant them a significant advantage in their early math and science education. 

          <br /><br />
          To that end, we designed STYX by incorporating the elements of its parent game and further emphasizing the focus on the river tiles and their relationship to each other. In order to succeed in STYX, children must manipulate each individual piece and considering how its placement will affect the nature of the field of play as a whole. Experts consider the creation of rudimentary maps and charts to be a fundamental means of heightening a child's spacial reasoning skills -- we consider the core gameplay loop of STYX to focus on this exact pedagogical technique, and highly encourage teachers to engage with their students on the way that the game pieces fit together and interact with each other.
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
