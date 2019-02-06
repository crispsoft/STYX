import React, { Component } from 'react';

import axios from 'axios';
import PlayerView from './PlayerView';
import Square from './Square';
import gameTiles from './../gameTiles.json';
import BorderSquare from './BorderSquare';


class AG extends Component {

  state = {
    test: null,

    PlayerBGs: ['red', 'orange', 'green', 'blue'],

    playerTile: null,
    // 4 players grid
    boards: 
        [...Array(4)].map(_ => Array(AG.boardSize * AG.boardSize))
  }

  componentWillMount() {
    axios.get("/api/test")
    .then( (results) => {
      this.setState({
        test: results.data.a
      })
    })

    console.log(AG.gameTiles, AG.gameTiles.startTile);

    this.addTileToBoard({ row: 4, col: 4, tile: AG.gameTiles.startTile });

    this.setState({ playerTile: AG.gameTiles.lakeTiles[0] });

    /* AG.gameTiles.lakeTiles.forEach((tile, idx) => {
      const row = Math.floor(idx / AG.boardSize);
      const col = idx % AG.boardSize;
      this.addTileToBoard({ row, col, tile });
    }); */
  }


  addTileToBoard({ row, col, tile }) {
    const [N, E, S, W, special] = tile.slice(0,4).map(v=>AG.colorMap[v]).concat(tile.slice(4));
    const sz = AG.boardSize;

    let boards = this.state.boards.slice();

    //* Player 1 board = as-is
    boards[0][      row *sz +        col] = [N, E, S, W, special];


    // Extend borders if not a tile or already a border
    // include check for edge of board
    if ((row+1) < sz) { 
      boards[0][ (row+1)*sz + col  ] = boards[0][ (row+1)*sz + col  ] || { isBorder:true };
    }
    if (row-1 >= 0) {
      boards[0][ (row-1)*sz + col  ] = boards[0][ (row-1)*sz + col  ] || { isBorder:true };
    }
    if ((col+1) < sz){
      boards[0][ (row  )*sz + col+1] = boards[0][ (row  )*sz + col+1] || { isBorder:true };
    }
    if (col-1 >= 0){
      boards[0][ (row  )*sz + col-1] = boards[0][ (row  )*sz + col-1] || { isBorder:true };
    }

    /* //* Player 2 board = rotate 90 deg ccw  row0->col0, col0->row9
    boards[1][(sz-1-col)*sz +        row] = [E, S, W, N, special];

    //* Player 3 board = rotate 180 deg     row0->row9, col0->col9
    boards[2][(sz-1-row)*sz + (sz-1)-col] = [S, W, N, E, special];

    //* Player 4 board = rotate 90 deg cw   row0->col9, col0->row0
    boards[3][      col *sz + (sz-1)-row] = [W, N, E, S, special]; */

    
    this.setState({ boards });
  }


  clickAvail = (row,col) => {
    console.log("click @ ", row, col);
    this.addTileToBoard({ row, col, tile: this.state.playerTile });
  }

  rotateTileInHand = () => {
    const [N, E, S, W, special] = [...this.state.playerTile];

    const playerTile = [W, N, E, S, special];

    this.setState({
      playerTile
    });
    
  }


  render() {

    const squares =
      this.state.boards[0].map( (square, squareIdx) => {

        const row = Math.floor(squareIdx / AG.boardSize) + 1;
        const col = squareIdx % AG.boardSize + 1;

        if (square.isBorder) {
          return <BorderSquare
            key={`square-${squareIdx}`}
            gridRow={row}
            gridColumn={col}
            onClick={() => this.clickAvail(row - 1, col - 1)} //! -1's because css grid is first index=1 based
          />
        }

        else if (Array.isArray(square)){
          return <Square
            key={`square-${squareIdx}`}
            row={row}
            col={col}
            colors={square}
          />
        }

        else {
          //TODO: empty square
          return null;
        }

      });

    return (

      <div className="container">

        <p>{this.state.test}</p>

        <div className="row">

          <div className="col-2">
            <Square 
              colors={this.state.playerTile.map(v=>AG.colorMap[v])} 
              onClick={this.rotateTileInHand} />
          </div>
          
          {/* {[...Array(4)].map((_, playerIdx) => ( */}

            <div key={`player-${1}`} className="col-5 my-1 mt-3">
              

              <PlayerView playerNum={1} bg={this.state.PlayerBGs[0]}>

                {squares}
                
              </PlayerView>
            </div>

          {/* ))} */}

        </div>
      </div>
    );
  }

}


AG.boardSize=9;
AG.gameTiles = gameTiles;
AG.colorMap = ['red', 'orange', 'yellow', 'green', 'blue', 'violet', 'black'];


export default AG;