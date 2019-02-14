import axios from 'axios';
import openSocket from 'socket.io-client';

import React, { Component } from "react";

import TitleCard from './components/TitleCard';
import BorderSquare from './components/BorderSquare';
import GameInfo     from './components/GameInfo';
import LanternCards from './components/LanternCards';
import DedicationCards from './components/DedicationCards';

import handle from './clientHandlers';

import styled from 'styled-components';

// #region Styles
import {
  FullScreenView,
  Points,
  Square,
  
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

const BoardGrid = styled.div`
  width : calc(70vh+12px);
  height: calc(70vh+12px);
  outline: solid #E2E2E8;
  display: grid;
  grid-gap: 2px;
  padding: 2px;
  grid-template-columns: repeat(7, 10vmin);
  grid-template-rows: repeat(7, 10vmin);
 
`;
// #endregion Styles

class App extends Component {
  state = {
    test: null, //TODO: remove. this is a state holder for api/test route


    //* State from server connection
    socket: openSocket('/'),
    gameReady: false,


    //* Public Game Info
    board: Array(App.boardSize * App.boardSize),
    whoseTurn: NaN,
    tradesValues: Array(3).fill(0),
    tradesActive: Array(3).fill(false),

    //* Opponent's (public) Game Info
    opponents: {
      left: {
        points: 0,
        status: '..waiting..',
        colors: Array(7).fill(0)
      },

      top: {
        points: 0,
        status: '..waiting..',
        colors: Array(7).fill(0)
      },

      right: {
        points: 0,
        status: '..waiting..',
        colors: Array(7).fill(0)
      }
    },

    
    //* Personal Game Info
    points: 0,
    seatIndex: NaN,
    oppMap: [], // maps seat indices from server to 'left', 'top', 'right', 'me'

    tilesInHand: [null, null, null],
    selectedTileIndex: NaN,
    colorQtys: Array(7).fill(0),
    colorsSelected: Array(7).fill(false),
   
  }

  componentWillMount() {

    axios.get("/api/test")
      .then((results) => {
        this.setState({
          test: results.data.a
        })
      })
    ;
      

    //* Socket -> State Handling
    const { socket } = this.state;
    socket.on('connect'   , () => this.setState(handle.connect   ));
    socket.on('disconnect', () => this.setState(handle.disconnect));

    socket.on('seat'      , (index) => this.setState(handle.seat (index)));
    socket.on('board'     , (board) => this.setState(handle.board(board)));
    socket.on('tiles'     , (tiles) => this.setState(handle.tiles(tiles)));
    
    socket.on('colors'    , (colors  ) => this.setState(handle.colors (colors  )));
    socket.on('turn'      , (index   ) => this.setState(handle.turn   (index   )));
    socket.on('ready'     , (status  ) => this.setState(handle.ready  (status  )));
    socket.on('players'   , (statuses) => this.setState(handle.players(statuses)));
    socket.on('trades'    , (trades  ) => this.setState(handle.trades (trades  )));
    socket.on('points'    , (points  ) => this.setState(handle.points (points  )));
  }


  clickAvail = (row, col) => {
    const { selectedTileIndex: idx } = this.state;

    if (!Number.isInteger(idx) || !this.state.tilesInHand[idx]) return;
    
    this.state.socket.emit('place', { row, col, tile: this.state.tilesInHand[idx], indexInHand: idx });

    this.setState({ selectedTileIndex: NaN });
  }

  handleTrade = (type) => {
    if (this.state.whoseTurn !== this.state.seatIndex) return; // don't trade out of turn

    let atLeast = Infinity;

    switch (type) {

      case '1-all': // good as is (all selected)
        atLeast = 1;
        break;

      case '3-pair':
        atLeast = 2;
        break;

      case '4-kind':
        atLeast = 4;
        break;

      default:
        return;
    }

    
    const emitColors = this.state.colorsSelected.map((selected,i) => (selected && this.state.colorQtys[i] >= atLeast));

    this.state.socket.emit('trade', emitColors);

    this.setState({
      colorsSelected: Array(7).fill(false),
      tradesActive: Array(3).fill(false)
    });
  }

  toggleColor = (colorIdx) => {
    const qtys = this.state.colorQtys;

    if (!qtys[colorIdx]) return; // don't toggle 0 qty

    const colorsSelected = [...this.state.colorsSelected];
    colorsSelected[colorIdx] = !colorsSelected[colorIdx]; // toggle

    const can4Kind =
      1 === colorsSelected.reduce((sum, currIsSelect, i) => sum + (currIsSelect && qtys[i]>=4), 0);
   
    const can1All =
      colorsSelected.every((isSelect, i) => isSelect && qtys[i] > 0);

    const can3pair = 
      3 === colorsSelected.reduce((sum, currIsSelect, i) => sum + (currIsSelect && qtys[i]>=2), 0);

    this.setState({
      colorsSelected,
      tradesActive: [can1All, can3pair, can4Kind]
    });
  }

  rotateTileInHand = (index) => {

    if (this.state.selectedTileIndex !== index){
      // first time clicking this tile = don't immediately rotate
      return this.setState({ selectedTileIndex: index });
    }

    const tilesInHand = [...this.state.tilesInHand];

    const [N, E, S, W, special] = tilesInHand[index];
    tilesInHand[index] = [W, N, E, S, special];

    this.setState({
      tilesInHand,
      selectedTileIndex: index
    });

  }

  render() {

    const isMyTurn = this.state.whoseTurn === this.state.seatIndex;

    const squares =
      this.state.board.map((square, squareIdx) => {

        const row = Math.floor(squareIdx / App.boardSize) + 1;
        const col = squareIdx % App.boardSize + 1;

        if (square && square.isBorder && isMyTurn && this.state.tilesInHand.length) { // only show border squares when it's player's turn and there are still tiles in hand
          return (
            <BorderSquare
              key={`square-${squareIdx}`}
              gridRow={row}
              gridColumn={col}
              onClick={() => this.clickAvail(row - 1, col - 1)} //! -1's because css grid is first index=1 based
            />
          )
        }

        else if (Array.isArray(square)) { // a regular tile, with an array of border colors
          const colors = square.map(n => App.colorMap[n]);
          return (
            <Square
              key={`square-${squareIdx}`}
              gridRow={row}
              gridColumn={col}
              colors={colors}
              special={square[4]}
            />
          );
        }

        else {
          //? TODO: empty square
          return null;
        }

      });

    const { top, left, right } = this.state.opponents;


    return (
      <FullScreenView>

        { //TODO: remove this 'server-check' message
        }
        <p style={{
          position: 'fixed',
          top: '1em',
          left: '1em'
        }}>
          Server says: {this.state.test}
          <br/>
          Socket says: {this.state.connection}
          <br/>
          I'm Player #{this.state.seatIndex+1}
          <br />
          {this.state.gameReady ? "READY!" : "..waiting for players.."}
        </p>

        <TitleCard />


        {/** Opponents **/}
        <TopPane selected={this.state.oppMap[this.state.whoseTurn] === 'top'}>
          <TopOppPanel>
            <Points>{`Points: ${top.points}`}</Points>
            {top.colors.map((qty, i) => (
              <LanternCards key={`top-colors-${i}`} color={App.colorMap[i]} number={qty} />
            ))}
          </TopOppPanel>

          <TopName>{top.status}</TopName>
        </TopPane>

        <LeftPane selected={this.state.oppMap[this.state.whoseTurn] === 'left'}>
          <LeftOppPanel>
            <Points>{`Points: ${left.points}`}</Points>
            {left.colors.map((qty, i) => (
              <LanternCards key={`left-colors-${i}`}color={App.colorMap[i]} number={qty} />
            ))}
          </LeftOppPanel>

          <LeftName>{left.status}</LeftName>
        </LeftPane>

        <RightPane selected={this.state.oppMap[this.state.whoseTurn] === 'right'}>
          <RightOppPanel>
            <Points>{`Points: ${right.points}`}</Points>
            {right.colors.map((qty, i) => (
              <LanternCards key={`right-colors-${i}`} color={App.colorMap[i]} number={qty} />
            ))}
          </RightOppPanel>

          <RightName>{right.status}</RightName>
        </RightPane>


        {/** Player **/}
        <BottomPane selected={isMyTurn}>

          <PlayerPanelTiles>
            {this.state.tilesInHand.map((tile,i) => (
              tile &&
              <Square /*//! TODO: think of key={}.. probably with refactor that each tile has unique ID */
                enabled
                selected={this.state.selectedTileIndex === i}
                colors={tile.map(v => App.colorMap[v])}
                special={tile[4]}
                onClick={() => this.rotateTileInHand(i)}
              />
            ))}
          </PlayerPanelTiles>

          <PlayerPanel>
            <Points >{`Points: ${this.state.points}`}</Points>
            {this.state.colorQtys.map((qty, i) => (
              <LanternCards key={`my-colors-${i}`}
                enabled  /*//? ={isMyTurn}*/
                selected={this.state.colorsSelected[i]}
                color={App.colorMap[i]} number={qty}
                onClick={() => this.toggleColor(i)} />
            ))}
          </PlayerPanel>

        </BottomPane>


        {/** Board & Info **/}
        <CenterPane>

          <BoardGrid>
            {squares}
          </BoardGrid>

          <GameInfo values={this.state.tradesValues}>
            {['1-all', '3-pair', '4-kind'].map((type, idx) => (
              <DedicationCards key={type}
                type={type}
                active={this.state.tradesActive[idx]} value={this.state.tradesValues[idx]}
                onClick={() => this.handleTrade(type)} />
            ))}
          </GameInfo>

        </CenterPane>

      </FullScreenView>
    )
  }
}


App.boardSize = 7;
App.colorMap = ['#6600ff', '#419B7F', '#FA6835', '#900C3F', '#CC2127', '#DD9933', '#2D83AC'];


export default App;
