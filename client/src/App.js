import openSocket from "socket.io-client";

import React, { Component } from "react";

import TitleCard       from "./components/TitleCard";
import RulesModalIcon  from "./components/RulesModalIcon";
import BorderSquare    from "./components/BorderSquare";
import GameInfo        from "./components/GameInfo";
import LanternCards    from "./components/LanternCards";
import DedicationCards from "./components/DedicationCards";
import BeastOnTile     from "./components/BeastOnTile";

import handle from "./clientHandlers";

import Tooltip from "@material-ui/core/Tooltip";

import { beastImgsMap } from "./constants/images";

import { favorColorsMap } from "./constants/colors";

// #region Styles
import {
  FullScreenView,
  Points,
  LakeTile,
  GrainOverlay,
  StatusSummary,
  BoardGrid,
  BoardSquare,
  TopPane,
  RightPane,
  BottomPane,
  LeftPane,
  CenterPane,
  TopOppPanel,
  LeftOppPanel,
  RightOppPanel,
  PlayerPanel,
  PlayerPanelTilesGrid,
  TopName,
  LeftName,
  RightName
} from "./AppStyles";

// #endregion Styles

class App extends Component {
  state = {
    //* State from server connection
    socket: openSocket("/"),
    connected: false,

    //* Game states
    gameReady: false,
    gameOver: false,
    currRound: NaN,
    remRounds: NaN,

    //* Public Game Info
    board: Array(App.boardSize * App.boardSize),
    whoseTurn: NaN,
    tradesValues: Array(3).fill(0),
    tradesActive: Array(3).fill(false),
    leaderIndices: Array(4).fill(NaN),

    //* Opponent's (public) Game Info
    opponents: {
      left: {
        points: 0,
        status: "..waiting..",
        colors: Array(7).fill(0)
      },

      top: {
        points: 0,
        status: "..waiting..",
        colors: Array(7).fill(0)
      },

      right: {
        points: 0,
        status: "..waiting..",
        colors: Array(7).fill(0)
      }
    },

    //* Personal Game Info
    points: 0,
    seatIndex: NaN,
    oppMap: [], // maps seat indices (0,1,2,3) from server to 'left', 'top', 'right', 'me'

    tilesInHand: [null, null, null],
    selectedTileIndex: NaN,
    colorQtys: Array(7).fill(0),
    colorsSelected: Array(7).fill(false)
  };

  constructor(props) {
    super(props);

    //* Socket -> State Handling
    const { socket } = this.state;
    socket.on("connect"   , () => this.setState(handle.connect   ));
    socket.on("disconnect", () => this.setState(handle.disconnect));

    socket.on("seat" , index => this.setState(handle.seat (index)));
    socket.on("board", board => this.setState(handle.board(board)));
    socket.on("tiles", tiles => this.setState(handle.tiles(tiles)));

    socket.on("colors" , colors      => this.setState(handle.colors (colors   )));
    socket.on("turn"   , index       => this.setState(handle.turn   (index    )));
    socket.on("ready"  , status      => this.setState(handle.ready  (status   )));
    socket.on("over"   , status      => this.setState(handle.over   (status   )));
    socket.on("players", statuses    => this.setState(handle.players(statuses )));
    socket.on("trades" , trades      => this.setState(handle.trades (trades   )));
    socket.on("points" , points      => this.setState(handle.points (points   )));
    socket.on("rounds" , (curr, rem) => this.setState(handle.rounds (curr, rem)));
  }

  componentWillUnmount() {
    this.state.socket.close();
  }

  handleTilePlacement = (row, col) => {
    if (this.state.whoseTurn !== this.state.seatIndex) return; // don't place tiles out of turn

    const { selectedTileIndex: idx } = this.state;
    const tile = this.state.tilesInHand[idx];

    if (!Number.isInteger(idx) || !tile) return;

    this.state.socket.emit("place",
      {
        row,
        col,
        tile,
        indexInHand: idx
      }
    );

    this.setState({ selectedTileIndex: NaN });
  };

  handleTrade = type => {
    if (this.state.whoseTurn !== this.state.seatIndex) return; // don't trade out of turn

    let atLeast = Infinity;

    switch (type) {
      case "1-all":
        atLeast = 1;
        break;

      case "3-pair":
        atLeast = 2;
        break;

      case "4-kind":
        atLeast = 4;
        break;

      default:
        return;
    }

    const emitColors = this.state.colorsSelected.map(
      (selected, i) => selected && this.state.colorQtys[i] >= atLeast
    );

    this.state.socket.emit("trade", emitColors);

    this.setState({
      colorsSelected: Array(7).fill(false),
      tradesActive: Array(3).fill(false)
    });
  };

  toggleColor = colorIdx => {
    const qtys = this.state.colorQtys;

    if (!qtys[colorIdx]) return; // don't toggle 0 qty

    const colorsSelected = [...this.state.colorsSelected];
    colorsSelected[colorIdx] = !colorsSelected[colorIdx]; // toggle

    const can4Kind =
      1 ===
      colorsSelected.reduce(
        (sum, currIsSelect, i) => sum + (currIsSelect && qtys[i] >= 4),
        0
      );

    const can1All = colorsSelected.every(
      (isSelect, i) => isSelect && qtys[i] > 0
    );

    const can3pair =
      3 ===
      colorsSelected.reduce(
        (sum, currIsSelect, i) => sum + (currIsSelect && qtys[i] >= 2),
        0
      );

    this.setState({
      colorsSelected,
      tradesActive: [can1All, can3pair, can4Kind]
    });
  };

  rotateTileInHand = index => {
    if (this.state.selectedTileIndex !== index) {
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
  };

  render() {
    const isMyTurn = this.state.whoseTurn === this.state.seatIndex;

    const { top, left, right } = this.state.opponents;

    let winnerText = "";
    if (this.state.gameOver) {
      const didIWin = this.state.leaderIndices.includes(this.state.seatIndex);
      const filterOpp = this.state.leaderIndices.filter(playerIdx => playerIdx !== this.state.seatIndex);
      //TODO tie breakers
      switch (this.state.leaderIndices.length) {
        case 1:
          winnerText = didIWin
          ? `You Won!`
          : `Player ${this.state.leaderIndices[0]+1} is the winner!`;
          break;

        case 2:
          winnerText = didIWin
          ? `You and Player ${filterOpp[0]+1} both tied to win!`
          : `Players ${this.state.leaderIndices[0]+1} and ${this.state.leaderIndices[1] + 1} both tied to win!`;
          break;

        case 3:
          winnerText = didIWin
          ? `You, Player ${filterOpp[0]+1}, and ${filterOpp[1]+1} all tied to win!`
          : `Players ${this.state.leaderIndices[0]+1}, ${this.state.leaderIndices[1]+1}, and ${this.state.leaderIndices[2]+1} all tied to win!`;
          break;

        case 4:
          winnerText = "Everybody tied to win!";
          break;

        default:;
      }
    }

    const squares = this.state.board.map((square, squareIdx, board) => {
      const sz = App.boardSize;

      const row = Math.floor(squareIdx / sz);
      const col = squareIdx % sz;

      const gridRow = row + 1; //! +1's because css grid is first index=1 based
      const gridColumn = col + 1;

      let childEl = null; // what to show IN the square (border, colors, default nothing)

      if (
        square &&
        square.isBorder &&
        this.state.gameReady &&
        isMyTurn &&
        this.state.tilesInHand.length
      ) {
        // only show border squares when it's player's turn and there are still tiles in hand
        childEl = <BorderSquare onClick={() => this.handleTilePlacement(row, col)} />;
      } else if (Array.isArray(square)) {
        // a regular tile, with an array of border colors

        const nTile = row > 0 && board[(row - 1) * sz + col];
        const nTileColor = nTile && nTile[2];
        const showNBeast =
          /* (nTile && nTile.isBorder) || */ nTileColor === square[0];

        const eTile = col < sz && board[row * sz + col + 1];
        const eTileColor = eTile && eTile[3];
        const showEBeast =
          /* (eTile && eTile.isBorder) || */ eTileColor === square[1];

        const sTile = row < sz && board[(row + 1) * sz + col];
        const sTileColor = sTile && sTile[0];
        const showSBeast =
          /* (sTile && sTile.isBorder) || */ sTileColor === square[2];

        const wTile = col > 0 && board[row * sz + col - 1];
        const wTileColor = wTile && wTile[1];
        const showWBeast =
          /* (wTile && wTile.isBorder) || */ wTileColor === square[3];

        const colorHexes = square.map(n => favorColorsMap[n]);
        const imageFileNames = square.map(n => beastImgsMap[n]);

        childEl = (<>
          <LakeTile colors={colorHexes} />

          <GrainOverlay src="assets/tileGrain.png" alt="" />

          {showNBeast && (
            <BeastOnTile
              src={`assets/beasts_white/${imageFileNames[0]}.png`}
              side="top"
            />
          )}
          {showEBeast && (
            <BeastOnTile
              src={`assets/beasts_white/${imageFileNames[1]}.png`}
              side="right"
            />
          )}
          {showSBeast && (
            <BeastOnTile
              src={`assets/beasts_white/${imageFileNames[2]}.png`}
              side="bottom"
            />
          )}
          {showWBeast && (
            <BeastOnTile
              src={`assets/beasts_white/${imageFileNames[3]}.png`}
              side="left"
            />
          )}
        </>);
      }

      return (
        <BoardSquare
          key={`square-${squareIdx}`}
          gridRow={gridRow}
          gridColumn={gridColumn}
        >
          {childEl}
        </BoardSquare>
      );
    });

    const statusTextEl =
      !this.state.connected
      ? <p>You are not in the game, hoo hoo!</p>

      : !this.state.gameReady
        ? <p>Waiting for 4 Players to play, hoo hoo.</p>

        : this.state.gameOver
          ?<p>Game Over
          <br/>{winnerText}
          </p>

            : !isMyTurn
            ? <p>{`It is Player ${this.state.whoseTurn + 1}'s turn.`}</p>
            : <p>It is YOUR turn, hoo hoo!
              <br/>Click me to see the rules!
              </p>
    ;

    return (
      <FullScreenView>

        <TitleCard />

        {/** Opponents **/}
        <TopPane selected={this.state.oppMap[this.state.whoseTurn] === "top"}>
          <TopOppPanel>
            <Points>{`Obols: ${top.points}`}</Points>
            {top.colors.map((qty, i) => (
              <LanternCards
                key={`top-colors-${i}`}
                color={favorColorsMap[i]}
                number={qty}
              />
            ))}
          </TopOppPanel>

          <TopName>{top.status}</TopName>
        </TopPane>

        <LeftPane selected={this.state.oppMap[this.state.whoseTurn] === "left"}>
          <LeftOppPanel>
            <Points>{`Obols: ${left.points}`}</Points>
            {left.colors.map((qty, i) => (
              <LanternCards
                key={`left-colors-${i}`}
                color={favorColorsMap[i]}
                number={qty}
              />
            ))}
          </LeftOppPanel>

          <LeftName>{left.status}</LeftName>
        </LeftPane>

        <RightPane selected={this.state.oppMap[this.state.whoseTurn] === "right"}>
          <RightOppPanel>
            <Points>{`Obols: ${right.points}`}</Points>
            {right.colors.map((qty, i) => (
              <LanternCards
                key={`right-colors-${i}`}
                color={favorColorsMap[i]}
                number={qty}
              />
            ))}
          </RightOppPanel>

          <RightName>{right.status}</RightName>
        </RightPane>

        {/** Player **/}
        <BottomPane selected={isMyTurn}>
        
          <PlayerPanelTilesGrid>
              {this.state.tilesInHand.map(
                (tile, i) =>
                  tile && (
                    <LakeTile /*//! TODO: think of key={}.. probably with refactor that each tile has unique ID */
                      style={{ gridColumn: i + 1 }}
                      enabled
                      selected={this.state.selectedTileIndex === i}
                      colors={tile.map(v => favorColorsMap[v])}
                      onClick={() => this.rotateTileInHand(i)}
                    />
                  )
              )}
          </PlayerPanelTilesGrid>

          <PlayerPanel>
            <Points>{`Obols: ${this.state.points}`}</Points>

            {this.state.colorQtys.map((qty, i) => (
              <Tooltip title={`${beastImgsMap[i]} favors`} placement="top">
                <LanternCards
                  key={`my-colors-${i}`}
                  enabled /*//? ={isMyTurn}*/
                  selected={this.state.colorsSelected[i]}
                  color={favorColorsMap[i]}
                  number={qty}
                  onClick={() => this.toggleColor(i)}
                />
              </Tooltip>
            ))}
          </PlayerPanel>
          
        </BottomPane>

        {/** Board & Info **/}
        <CenterPane>
          <BoardGrid>{squares}</BoardGrid>

          <GameInfo
            values={this.state.tradesValues}
            currRound={this.state.currRound}
            remRounds={this.state.remRounds}
          >
            {["1-all", "3-pair", "4-kind"].map((type, idx) => (
             
                <DedicationCards
                  key={type}
                  type={type}
                  colors={this.state.colorQtys}
                  selected={this.state.colorsSelected}
                  value={this.state.tradesValues[idx]}
                  active={isMyTurn && this.state.tradesActive[idx]}
                  onClick={this.state.tradesActive[idx] ? (() => this.handleTrade(type)) : undefined}
                />
              
            ))}
          </GameInfo>
        </CenterPane>

        <StatusSummary>{statusTextEl}</StatusSummary>
        <RulesModalIcon />

      </FullScreenView>
    );
  }
}

App.boardSize = 7;

export default App;
