import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from 'axios';
import PlayerView from './components/PlayerView';
import PlayerPane from './components/PlayerPane';
import SideOpponentPane from './components/OpponentPane'
import Square from './components/Square';
import gameTiles from './gameTiles.json';
import Button from '@material-ui/core/Button';
import { SSL_OP_PKCS1_CHECK_1 } from "constants";



import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import AG from './components/AG';

class App extends Component {

  render() {
    return (

      <div className="container">

        <p>{this.state.test}</p>

        <div className="row">

          <PlayerPane playerNum={2} bg="red">
          </PlayerPane>
        
        
        </div>


        <div className="row">
          <div className="col-md-2">
            <SideOpponentPane bg={"red"}/>
          </div>
          <div className="col-md-8">
          
          {/* {[...Array(4)].map((_, playerIdx) => ( */}

            <div key={`player-${1}`} className="col-5 my-1 mt-3">
              <PlayerView playerNum={1} bg={this.state.PlayerBGs[0]}>
                {
                  this.state.boards[0].map( (colors, squareIdx) => 
                    colors && 
                    <Square 
                      key={`square-${squareIdx}`} 
                      row={Math.floor(squareIdx/App.boardSize)+1} 
                      col={squareIdx%App.boardSize+1} 
                      colors={colors} 
                      /> )
                }
              </PlayerView>
          
          </div>

        
          </div>
          <div className="col-md-2">
                <SideOpponentPane bg="yellow" />
          </div>
          <div className="row">
              <br></br>
              <PlayerPane bg="blue">

                <Button variant="contained" color="primary">
                Hello, world!
                </Button>

                
              </PlayerPane>

            </div>
          

          {/* ))} */}

        </div>
      </Router>
    )
  }
}


export default App;
