import axios from 'axios';

import React, { Component } from "react";

import Square       from './components/Square';
import BorderSquare from './components/BorderSquare';
import GameInfo     from './components/GameInfo';
import LanternCards from './components/LanternCards';

import gameTiles from './gameTiles.json'

import styled from 'styled-components';


// #region Styles

import {
     TopPane,
   RightPane,
  BottomPane,
    LeftPane,
  CenterPane,

    TopOppPanel,
   LeftOppPanel,
  RightOppPanel,
    PlayerPanel,
    PlayerPanelTiles,

    TopName,
   LeftName,
  RightName,
} from './AppStyles';



const FullScreenView = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;

const BoardGrid = styled.div`
  width: calc(70vh+12px);  height: calc(70vh+12px);
  outline-style: solid;
  display: grid;
  grid-gap: 2px;
  padding: 2px;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(7, 1fr);
`;


// #endregion Styles


class App extends Component {
  state = {
    test: null,
    playerTile: null,
    board: Array(App.boardSize * App.boardSize)
  }

  componentWillMount() {

    axios.get("/api/test")
      .then((results) => {
        this.setState({
          test: results.data.a
        })
      })

    this.addTileToBoard({ row: 3, col: 3, tile: App.gameTiles.startTile });

    this.setState({
      playerTile: App.gameTiles.lakeTiles[0]
    });

  }


  addTileToBoard({ row, col, tile }) {
    const [N, E, S, W, special] = tile.slice(0, 4).map(v => App.colorMap[v]).concat(tile.slice(4));
    const sz = App.boardSize;

    let board = this.state.board.slice();

    //* Player 1 board = as-is
    board[row * sz + col] = [N, E, S, W, special];

    // Extend borders if not a tile or already a border
    // include check for edge of board
    if ((row + 1) < sz) {
      board[(row + 1) * sz + col] = board[(row + 1) * sz + col] || { isBorder: true };
    }
    if (row - 1 >= 0) {
      board[(row - 1) * sz + col] = board[(row - 1) * sz + col] || { isBorder: true };
    }
    if ((col + 1) < sz) {
      board[(row) * sz + col + 1] = board[(row) * sz + col + 1] || { isBorder: true };
    }
    if (col - 1 >= 0) {
      board[(row) * sz + col - 1] = board[(row) * sz + col - 1] || { isBorder: true };
    }

    this.setState({ board });
  }

  clickAvail = (row, col) => {
    this.addTileToBoard({ row, col, tile: this.state.playerTile });
  }


  rotateTileInHand = (index) => {
    const [N, E, S, W, special] = [...this.state.playerTile];

    const playerTile = [W, N, E, S, special];

    this.setState({
      playerTile
    });

  }

  render() {

    const squares =
      this.state.board.map((square, squareIdx) => {

        const row = Math.floor(squareIdx / App.boardSize) + 1;
        const col = squareIdx % App.boardSize + 1;

        if (square.isBorder) {
          return (
            <BorderSquare
              key={`square-${squareIdx}`}
              gridRow={row}
              gridColumn={col}
              onClick={() => this.clickAvail(row - 1, col - 1)} //! -1's because css grid is first index=1 based
            />
          )
        }

        else if (Array.isArray(square)) {
          return (
            <Square
              key={`square-${squareIdx}`}
              row={row}
              col={col}
              colors={square}
            />
          );
        }

        else {
          //? TODO: empty square
          return null;
        }

      });


    return (
      <FullScreenView>

        { //TODO: remove this 'server-check' message
        }
        <p style={{
          position: 'fixed',
          top: '1em',
          left: '1em'
        }}>Server says: {this.state.test}</p>


        {/** Opponents **/}
        <TopPane>
          <TopOppPanel>
            <p>{`Points: 0`}</p>
            {[...Array(7)].map((_,i) => (
                <LanternCards color={App.colorMap[i]} number={i} />
              ))}
          </TopOppPanel>

          <TopName>{` Top Name `}</TopName>
        </TopPane>

        <LeftPane>
          <LeftOppPanel>
            <p>{`Points: 0`}</p>
            {[...Array(7)].map((_,i) => (
                <LanternCards color={App.colorMap[i]} number={i} />
              ))}
          </LeftOppPanel>

          <LeftName>{` Left Name `}</LeftName>
        </LeftPane>

        <RightPane>
          <RightOppPanel>
            <p>{`Points: 0`}</p>
            {[...Array(7)].map((_,i) => (
                <LanternCards color={App.colorMap[i]} number={i} />
              ))}
          </RightOppPanel>

          <RightName>{` Right Name `}</RightName>
        </RightPane>


        {/** Player **/}
        <BottomPane>

          <PlayerPanelTiles>
            <Square
              colors={this.state.playerTile.map(v => App.colorMap[v])}
              onClick={() => this.rotateTileInHand(0)}
            />
            <Square
              colors={this.state.playerTile.map(v => App.colorMap[v])}
              onClick={() => this.rotateTileInHand(1)}
            />
            <Square
              colors={this.state.playerTile.map(v => App.colorMap[v])}
              onClick={() => this.rotateTileInHand(2)}
            />
          </PlayerPanelTiles>

          <PlayerPanel>
            <p>{`Points: 0`}</p>
            {[...Array(7)].map((_, i) => (
              <LanternCards color={App.colorMap[i]} number={i} />
            ))}
          </PlayerPanel>

        </BottomPane>


        {/** Board **/}
        <CenterPane>
          <BoardGrid>
            {squares}
          </BoardGrid>
          <GameInfo />
        </CenterPane>

      </FullScreenView>
    )
  }
}


App.boardSize = 7;
App.gameTiles = gameTiles;
App.colorMap = ['red', 'orange', 'darkkhaki', 'green', 'blue', 'violet', 'black'];


export default App;
