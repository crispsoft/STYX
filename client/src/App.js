import axios from 'axios';
import openSocket from 'socket.io-client';

import React, { Component } from "react";

import Square       from './components/Square';
import BorderSquare from './components/BorderSquare';
import GameInfo     from './components/GameInfo';
import LanternCards from './components/LanternCards';

import handle from './clientHandlers';

import styled from 'styled-components';

// #region Styles
import {
  FullScreenView,
  
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
  outline-style: solid;
  display: grid;
  grid-gap: 2px;
  padding: 2px;
  grid-template-columns: repeat(7, 10vmin);
  grid-template-rows: repeat(7, 10vmin);
`;
// #endregion Styles


class App extends Component {
  state = {
    socket: openSocket('/'),
    gameReady: false,
    test: null,

    opponents: {
      left: {
        status: '',
        colors: Array(7).fill(0)
      },

      top: {
        status: '',
        colors: Array(7).fill(0)
      }
      ,
      right: {
        status: '',
        colors: Array(7).fill(0)
      }
    },

    tilesInHand: [null, null, null],
    selectedTileIndex: NaN,
    colorQtys: Array(7).fill(0),
    board: Array(App.boardSize * App.boardSize),
  }

  componentWillMount() {

    axios.get("/api/test")
      .then((results) => {
        this.setState({
          test: results.data.a
        })
      })
    ;
      

    // Socket Handling
    const { socket } = this.state;
    socket.on('connect'   ,       () => this.setState(handle.connect        ));
    socket.on('disconnect',       () => this.setState(handle.disconnect     ));

    socket.on('seat'      , ( index) => this.setState(handle.seat   ( index)));
    socket.on('board'     , ( board) => this.setState(handle.board  ( board)));
    socket.on('tiles'     , ( tiles) => this.setState(handle.tiles  ( tiles)));
    
    socket.on('colors'    , (  colors) => this.setState(handle.colors (  colors)));
    socket.on('ready'     , (status  ) => this.setState(handle.ready  (status  )));
    socket.on('players'   , (statuses) => this.setState(handle.players(statuses)));
    
  }


  clickAvail = (row, col) => {
    const { selectedTileIndex: idx } = this.state;

    if (!Number.isInteger(idx)) return;
    
    //! TODO: send to server this.addTileToBoard({ row, col, tile: this.state.tilesInHand[idx] }); 
  }


  rotateTileInHand = (index) => {
    const tilesInHand = [...this.state.tilesInHand];

    const [N, E, S, W, special] = tilesInHand[index];
    tilesInHand[index] = [W, N, E, S, special];

    this.setState({
      tilesInHand,
      selectedTileIndex: index
    });

  }

  render() {

    const squares =
      this.state.board.map((square, squareIdx) => {

        const row = Math.floor(squareIdx / App.boardSize) + 1;
        const col = squareIdx % App.boardSize + 1;

        if (square && square.isBorder) {
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
          const colors = square.map(n => App.colorMap[n]);
          return (
            <Square
              key={`square-${squareIdx}`}
              row={row}
              col={col}
              colors={colors}
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
        }}>
          Server says: {this.state.test}
          <br/>
          Socket says: {this.state.connection}
          <br/>
          I'm Player #{this.state.seatedAt}
          <br />
          {this.state.gameReady ? "READY!" : "..waiting for players.."}
        </p>


        {/** Opponents **/}
        <TopPane>
          <TopOppPanel>
            <p>{`Points: 0`}</p>
            {this.state.opponents.top.colors.map((qty, i) => (
              <LanternCards color={App.colorMap[i]} number={qty} />
            ))}
          </TopOppPanel>

          <TopName>{this.state.opponents.top.status}</TopName>
        </TopPane>

        <LeftPane>
          <LeftOppPanel>
            <p>{`Points: 0`}</p>
            {this.state.opponents.left.colors.map((qty, i) => (
              <LanternCards color={App.colorMap[i]} number={qty} />
            ))}
          </LeftOppPanel>

          <LeftName>{this.state.opponents.left.status}</LeftName>
        </LeftPane>

        <RightPane>
          <RightOppPanel>
            <p>{`Points: 0`}</p>
            {this.state.opponents.right.colors.map((qty, i) => (
              <LanternCards color={App.colorMap[i]} number={qty} />
            ))}
          </RightOppPanel>

          <RightName>{this.state.opponents.right.status}</RightName>
        </RightPane>


        {/** Player **/}
        <BottomPane>

          <PlayerPanelTiles>
            {this.state.tilesInHand.map((tile,i) => (
              tile &&
              <Square
                colors={tile.map(v => App.colorMap[v])}
                special={tile[4]}
                onClick={() => this.rotateTileInHand(i)}
            />
            ))}
          </PlayerPanelTiles>

          <PlayerPanel>
            <p>{`Points: 0`}</p>
            {this.state.colorQtys.map((qty, i) => (
              <LanternCards color={App.colorMap[i]} number={qty} />
            ))}
          </PlayerPanel>

        </BottomPane>


        {/** Board & Info **/}
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
App.colorMap = ['red', 'orange', 'darkkhaki', 'green', 'blue', 'violet', 'black'];


export default App;
