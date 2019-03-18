const game = require('./../gamelogic');
const gameDB = require('./../api/gameDB');
const { Turn } = require('./../models');


const BOARD_ROT_MAPs = [
  //% Player 1 is basis of BOARD perspective

  , //! empty at index 0

  //* Player 2 perspective
  [ 6, 13, 20, 27, 34, 41, 48,
    5, 12, 19, 26, 33, 40, 47,
    4, 11, 18, 25, 32, 39, 46,
    3, 10, 17, 24, 31, 38, 45,
    2,  9, 16, 23, 30, 37, 44,
    1,  8, 15, 22, 29, 36, 43,
    0,  7, 14, 21, 28, 35, 42, ],

  //* Player 3 perspective
  [ 48, 47, 46, 45, 44, 43, 42,
    41, 40, 39, 38, 37, 36, 35,
    34, 33, 32, 31, 30, 29, 28,
    27, 26, 25, 24, 23, 22, 21,
    20, 19, 18, 17, 16, 15, 14,
    13, 12, 11, 10,  9,  8,  7,
     6,  5,  4,  3,  2,  1,  0, ],

  //* Player 4 perspective
  [ 42, 35, 28, 21, 14,  7,  0,
    43, 36, 29, 22, 15,  8,  1,
    44, 37, 30, 23, 16,  9,  2,
    45, 38, 31, 24, 17, 10,  3,
    46, 39, 32, 25, 18, 11,  4,
    47, 40, 33, 26, 19, 12,  5,
    48, 41, 34, 27, 20, 13,  6, ],
  
];

const TILE_ROT_MAPs = [
  //% last index is for special characteristics

  //% Player 1 is basis of TILE perspective

  , //! empty at index 0

  //* Player 2 perspective
  [1, 2, 3, 0, 4],

  //* Player 3 perspective
  [2, 3, 0, 1, 4],

  //* Player 4 perspective
  [3, 0, 1, 2, 4],
]


const playerConnections = Array(4).fill(null);
const playerConnMap = new Map();
const spectatorConnections = new Map();

let isGameReady = false;
let gameDB_id = null;
let currentTurnDoc = null;

const playerBoard = (index) => {

  if (index === 0){
    //% Player 1 (index 0) is basis of board perspective
    return game.board;
  }

  //% other players 2,3,4 have ROTated board perspective

  const theirTileMapper = TILE_ROT_MAPs[index]; // stored to maintain throughout board mapping

  const theirBoard = BOARD_ROT_MAPs[index].map(boardRot => {

    // see if there is any tile at that location, and if so rotate its colors
    let theirTile = game.board[boardRot];
    if (theirTile && !theirTile.isBorder) {
      theirTile = theirTileMapper.map(tileRot => game.board[boardRot][tileRot]);
    }

    return theirTile;

  });

  return theirBoard;

}

function emitBoard(...clientIDs) {

  if (clientIDs.length) {

    clientIDs.forEach(id => {

      if (playerConnMap.has(id)) {
        const index = playerConnMap.get(id);
        playerConnections[index].emit('board', playerBoard(index));
        return;
      }

      if (spectatorConnections.has(id)) {
        const conn = spectatorConnections.get(id);
        conn.emit('board', playerBoard(0)); //% spectators have Player 1's POV
      }

    });

  }
  
  else {
    playerConnections.forEach((conn, connIdx) => {
      conn && conn.emit('board', playerBoard(connIdx));
    });

    spectatorConnections.forEach(spectConn => spectConn && spectConn.emit('board', playerBoard(0)))
  }

}

function emitTiles(...clientIDs) {

  if (clientIDs.length) {
    clientIDs.filter(id => playerConnMap.has(id)).forEach(id => {
      const index = playerConnMap.get(id);
      playerConnections[index].emit('tiles', game.players[index].hand)
    });
  }

  // otherwise if empty parameters, emit tiles to ALL connections
  else {
    playerConnections.forEach((conn, connIdx) => {
      if (conn) {
        const theirHandTiles = game.players[connIdx].hand;
        conn.emit('tiles', theirHandTiles);
      }
    })
  }

}

function emitColors(conn) {
  const colors = game.players.map(player => player.colors);
  conn.emit('colors', colors);
}

function emitTurn(conn) {
  const playerIndex = game.whoseTurn;
  conn.emit('turn', playerIndex);
}

function emitTrades(conn) {
  const trades = game.tradeValues;
  conn.emit('trades', trades);
}

function emitPoints(conn) {
  const points = game.players.map(player => player.points);
  conn.emit('points', points);
}

function emitOver(conn) {
  const isOver = game.isOver;
  conn.emit('over', isOver);
}

function emitReady(conn) {
  conn.emit('ready', isGameReady);
}

function emitRound(conn) {
  const currRound = game.round;
  const remRounds = game.maxRounds - currRound;
  conn.emit('rounds', currRound, remRounds);
}


function startTheGame(socket) {
  //% care: https://mongoosejs.com/docs/queries.html#queries-are-not-promises
  gameDB.new().then(({ _id }) => gameDB_id = _id).catch(); // TODO: error handling
  
  game.setup();

  currentTurnDoc = new Turn({ playerIdx: game.whoseTurn });

  emitBoard();
  emitTiles();
  emitColors(socket);
  emitTurn(socket);
  emitTrades(socket);
  emitRound(socket);
}


function handlePlaceTile({ socket, clientID }, { row, col, tile, indexInHand }) {

  if (!playerConnMap.has(clientID)) {
    return console.log("\n\t\t'@ handle Place, from unknown client!?\n\t", clientID);
  }

  if (!isGameReady) { return false; }


  const playerIdx = playerConnMap.get(clientID);

  // transform row/col & tile BACK to Player 1 - perspective
  const rowOrig = row; 
  const colOrig = col;

  const [n,e,s,w,special] = tile;
  if (playerIdx === 1) {
    row = colOrig;
    col = 6 - rowOrig;
    tile = [w, n, e, s, special];
  }
  else if (playerIdx === 2) {
    row = 6 - rowOrig;
    col = 6 - colOrig;
    tile = [s, w, n, e, special];
  }
  else if (playerIdx === 3) {
    row = 6 - colOrig;
    col = rowOrig;
    tile = [e, s, w, n, special];
  }

  if (game.checkAndPlace(playerIdx, { row, col, tile, indexInHand })) {
    // successfully placed    
    currentTurnDoc.tilePlace = { row, col, tile }
    gameDB.endTurn(gameDB_id, currentTurnDoc);

    currentTurnDoc = new Turn({ playerIdx: game.whoseTurn });
  }

  emitBoard();

  emitTiles(clientID);

  emitColors(socket);

  emitRound(socket);
  emitTurn(socket);
  emitOver(socket);

  if (game.isOver){
    gameDB.end(gameDB_id);
  }
}


function handleTrade({ socket, clientID }, colors) {

  if (!playerConnMap.has(clientID)) {
    return console.log("\n\t\t'@ handle Trade, from unknown client!?\n\t", clientID);
  }

  if (!isGameReady) { return false; }
  

  const playerIdx = playerConnMap.get(clientID);

  if (game.checkAndTrade(playerIdx, colors)) {
    // successfully traded
    currentTurnDoc.trades.push(colors);
  }

  emitTrades(socket);
  
  emitColors(socket);
  emitPoints(socket);

  emitRound(socket);
  emitTurn(socket);

  if (game.whoseTurn !== currentTurnDoc.playerIdx) {
    gameDB.endTurn(gameDB_id, currentTurnDoc);
    currentTurnDoc = new Turn({ playerIdx: game.whoseTurn });
  }

  emitOver(socket);
  
  if (game.isOver){
    gameDB.end(gameDB_id);
  }
}



module.exports = (socket) => {

  socket.on('connection', client => {

    //! not sure under what conditions this fires
    /* client.on('reconnect', () => {
      console.log("reconnect!?");
    }); */


    const nextPlayerIdx = playerConnections.indexOf(null);


    //* Add connection as spectator
    if (nextPlayerIdx < 0) { //* No room for another player

      console.log(`${client.id} (spect) conn'd.`);
      
      //? TODO: send message game is full

      spectatorConnections.set(client.id, client);
      client.emit('seat', -1);
      client.emit('players', playerConnections.map(conn => !!conn));

      //* Spectator Disconnect
      client.on('disconnect', () => { 
        console.log(`${client.id} (spect?) disconn'd.`);
        
        spectatorConnections.delete(client.id);
      });


      //* Spectators connect to games in progress
      // if (gameDB_id !== null) {
        // give them all the states
        emitBoard(client.id);
        client.emit('tiles', []); // this will be sure to clear any tiles they may have as a previous player

        emitReady(client);
        emitTurn(client);

        emitPoints(client);
        emitColors(client);
        emitTrades(client);
        emitRound(client);
        emitOver(client);
      // }

      return;
    }


    // else { 

    //* Add connection as player
    playerConnections[nextPlayerIdx] = client;
    playerConnMap.set(client.id, nextPlayerIdx);

    client.emit('seat', nextPlayerIdx);
    socket.emit('players', playerConnections.map(conn => !!conn));

    //* Player Disconnect
    client.on('disconnect', () => {

      //* Player Disconnect
      const idx = playerConnMap.get(client.id);
      if (idx !== undefined) { // Player had been seated

        // removing from array & map connection variables
        playerConnections[idx] = null;
        playerConnMap.delete(client.id);

        isGameReady = false;
        emitReady(socket); // wait for full game
        
        socket.emit('players', playerConnections.map(conn => !!conn)); // update players joined


        if (playerConnections.every(conn => conn === null)) {
          // abandon/stop game if no player connections left
  
          if (gameDB_id && !game.isOver) { // remove games that did not finish
            gameDB.removeByID(gameDB_id);
            spectatorConnections.forEach(conn => conn.disconnect());
          }
  
          gameDB_id = null;
        }
      }
    });


    //* Interactions FROM Player Client
    client.on('place', ({ row, col, tile, indexInHand } = {}) => {
      handlePlaceTile({ socket, clientID: client.id }, { row, col, tile, indexInHand })
    });

    client.on('trade', (colors) => {
      handleTrade({ socket, clientID: client.id }, colors);
    });


    //* check if All Players Seated
    if (playerConnections.every(conn => conn !== null)) {
      isGameReady = true;
      emitReady(socket);

      //* start new game if not in progress
      if (gameDB_id === null) {
        startTheGame(socket, playerConnections);
      }
    }

    //* Player re/connecting to game in progress
    if (gameDB_id !== null) {
      // give them all the states
      emitTiles(client.id); 
      emitBoard(client.id);

      emitTurn(client);
      emitPoints(client);
      emitColors(client);
      emitTrades(client);
      emitRound(client);
      emitOver(client);
    }

  });
}
