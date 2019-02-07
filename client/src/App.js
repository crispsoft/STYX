import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from 'axios';
import PlayerView from './components/PlayerView';
import Square from './components/Square';
import gameTiles from './gameTiles.json';



class App extends Component {
  state = {
    test: null,

    PlayerBGs: ['red', 'orange', 'green', 'blue'],

    // 4 players grid
    boards: 
        [...Array(4)].map(_ => Array(App.boardSize * App.boardSize))
  }


  componentWillMount() {
    axios.get("/api/test")
    .then( (results) => {
      this.setState({
        test: results.data.a
      })
    })

    console.log(App.gameTiles, App.gameTiles.startTile);

    this.addTileToBoard({row: 4, col: 4, tile: App.gameTiles.startTile});

    let at = 0;
    App.gameTiles.lakeTiles.forEach(tile => {
      const row = Math.floor(at / App.boardSize);
      const col = at % App.boardSize;
      this.addTileToBoard({ row, col, tile });
      ++at;
    });
  }

  addTileToBoard({ row, col, tile }) {
    const [N, E, S, W, special] = tile.slice(0,4).map(v=>App.colorMap[v]).concat(tile.slice(4));
    const sz = App.boardSize;

    let boards = this.state.boards.slice();

    //* Player 1 board = as-is
    boards[0][      row *sz +        col] = [N, E, S, W, special];

    //* Player 2 board = rotate 90 deg ccw  row0->col0, col0->row9
    boards[1][(sz-1-col)*sz +        row] = [E, S, W, N, special];

    //* Player 3 board = rotate 180 deg     row0->row9, col0->col9
    boards[2][(sz-1-row)*sz + (sz-1)-col] = [S, W, N, E, special];

    //* Player 4 board = rotate 90 deg cw   row0->col9, col0->row0
    boards[3][      col *sz + (sz-1)-row] = [W, N, E, S, special];

    
    this.setState({ boards });
  }

  render() {
    return (

      <div className="container">

        <p>{this.state.test}</p>

        <div className="row">
          
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

          {/* ))} */}

        </div>
      </div>
    );
  }
}

App.boardSize=9;
App.gameTiles = gameTiles;
App.colorMap = ['red', 'orange', 'yellow', 'green', 'blue', 'violet', 'black'];

export default App;
