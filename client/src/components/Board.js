import React, { Component } from 'react';

import axios from 'axios';
import PlayerView from './PlayerView';
import Square from './Square';
import gameTiles from './../gameTiles.json';
import BorderSquare from './BorderSquare';


class Board extends Component {

  state = {
    test: null,

    PlayerBGs: ['red', 'orange', 'green', 'blue'],

    playerTile: null,
    
    board: Array(Board.boardSize * Board.boardSize)
  }

  componentWillMount() {

    axios.get("/api/test")
      .then((results) => {
        this.setState({
          test: results.data.a
        })
      })

    // console.log(Board.gameTiles, Board.gameTiles.startTile);

    this.addTileToBoard({ row: 4, col: 4, tile: Board.gameTiles.startTile });


    this.setState({
      playerTile: Board.gameTiles.lakeTiles[0]
    });

  }


  addTileToBoard({ row, col, tile }) {
    const [N, E, S, W, special] = tile.slice(0,4).map(v=>Board.colorMap[v]).concat(tile.slice(4));
    const sz = Board.boardSize;

    let board = this.state.board.slice();

    //* Player 1 board = as-is
    board[row*sz + col] = [N, E, S, W, special];

    // Extend borders if not a tile or already a border
    // include check for edge of board
    if ((row+1) < sz) { 
      board[ (row+1)*sz + col  ] = board[ (row+1)*sz + col  ] || { isBorder:true };
    }
    if (row-1 >= 0) {
      board[ (row-1)*sz + col  ] = board[ (row-1)*sz + col  ] || { isBorder:true };
    }
    if ((col+1) < sz){
      board[ (row  )*sz + col+1] = board[ (row  )*sz + col+1] || { isBorder:true };
    }
    if (col-1 >= 0){
      board[ (row  )*sz + col-1] = board[ (row  )*sz + col-1] || { isBorder:true };
    }
    
    this.setState({ board });
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
      this.state.board.map((square, squareIdx) => {

        const row = Math.floor(squareIdx / Board.boardSize) + 1;
        const col = squareIdx % Board.boardSize + 1;

        if (square.isBorder) {
          return <BorderSquare
            key={`square-${squareIdx}`}
            gridRow={row}
            gridColumn={col}
            onClick={() => this.clickAvail(row - 1, col - 1)} //! -1's because css grid is first index=1 based
          />
        }

        else if (Array.isArray(square)) {
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
      <>

        <div className="col-2">
          <Square
            colors={this.state.playerTile.map(v => Board.colorMap[v])}
            onClick={this.rotateTileInHand} />
        </div>

        <div key={`player-${1}`} className="col-5 my-1 mt-3">
          <PlayerView playerNum={1} bg={this.state.PlayerBGs[0]}>
            {squares}
          </PlayerView>
        </div>

      </>
    );
  }

}


Board.boardSize=9;
Board.gameTiles = gameTiles;
Board.colorMap = ['red', 'orange', 'yellow', 'green', 'blue', 'violet', 'black'];


export default Board;