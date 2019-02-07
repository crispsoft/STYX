import React, { Component } from "react";
import "./App.css";
import axios from 'axios';
import PlayerPane from './components/PlayerPane';
import SideOpponentPane from './components/OpponentPane'
import Button from '@material-ui/core/Button';
import Board from './components/Board';

class App extends Component {
  state = {
    test: null
  }

  componentWillMount() {

    axios.get("/api/test")
      .then((results) => {
        this.setState({
          test: results.data.a
        })
      })
    }

  render() {
    return (
      <div className="container">
        <p>Server says: {this.state.test}</p>

        <div className="row">
          <PlayerPane playerNum={2} bg="red">
          </PlayerPane>
        </div>

        <div className="row">

          <div className="col-md-2">
            <SideOpponentPane bg={"red"} />
          </div>

          <div className="col-md-8">
            <div key={`player-${1}`} className="col-5 my-1 mt-3">
              <Board />
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

        </div>
      </div>
    )
  }
}


export default App;
