import React, { Component } from 'react';

import axios from 'axios';

import GameLogin from "../GameLogin";


import styled from 'styled-components';
import { offWhite } from './../../constants/colors';
import { WavyBackground } from './page.styles';

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
  padding: 1rem;
  
  text-align: justify;

  margin-left: 15%;
  margin-right: 15%;

  font-family: "Imprima", sans-serif;
  font-weight: 70;
  font-size: 1.3em;
  color: ${offWhite};
`;


class EdGuide extends Component {
  state = {
    authOnlyData: null
  }

  componentDidMount() {

    axios.get('/admin')

      .then(results => {
        // console.log('axios GET /admin results', results);
        this.setState({
          authOnlyData: results.data
        })
      })

      .catch(err => {
        // console.log('axios GET /admin error', err)
        this.setState({
          authOnlyData: null
        })
      })

    ;
  }

  handleLogin = (loginResults) => {
    if (loginResults.statusText === 'OK') {
      this.setState({
        authOnlyData: loginResults.data
      })
    }
  }

  makeContentHTML = (html) => ({ __html: html })

  render() {
    return (
      <WavyBackground>
        <HeroText>Teaching Guide</HeroText>

        { this.state.authOnlyData
          ? <EdGuideContent dangerouslySetInnerHTML={this.makeContentHTML(this.state.authOnlyData)} />
          : <GameLogin onLogin={this.handleLogin} />
        }
        
      </WavyBackground>
    );
  }
}

export default EdGuide;
