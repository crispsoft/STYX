const game = require('./../gamelogic');
const gameDB = require('./../api/gameDB');


const BOARD_ROT_MAPs = [
  //% Player 1 is basis of BOARD perspective

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
  //% Player 1 is basis of TILE perspective
  //% last index is for special characteristics

  //* Player 2 perspective
  [1, 2, 3, 0, 4],

  //* Player 3 perspective
  [2, 3, 0, 1, 4],

  //* Player 4 perspective
  [3, 0, 1, 2, 4],
]


const playerConnections = Array(4).fill(null);
const playerConnMap = new Map();


function emitBoard() {
  //% Player 1 is basis of board perspective
  playerConnections[0].emit('board', game.board);

  //% Players 2,3,4 have rotated board perspective
  playerConnections.slice(1).forEach((conn, connIdx) => {
    const theirTileMapper = TILE_ROT_MAPs[connIdx]; // stored to maintain throughout board mapping

    const theirBoard = BOARD_ROT_MAPs[connIdx].map(boardRot => {

      // see if there is any tile at that location, and if so rotate its colors
      let theirTile = game.board[boardRot];
      if (theirTile && !theirTile.isBorder) {
        theirTile = theirTileMapper.map(tileRot => game.board[boardRot][tileRot]);
      }

      return theirTile;

    });

    conn.emit('board', theirBoard);

  });

}

function emitTiles(...clientIDs) {

  if (clientIDs.length) {
    clientIDs.forEach(id => {
      const index = playerConnMap.get(id);
      playerConnections[index].emit('tiles', game.players[index].hand);
    });
  }

  // otherwise if empty parameters, emit tiles to ALL connections
  else {
    playerConnections.forEach((conn, connIdx) => {
      const theirHandTiles = game.players[connIdx].hand;
      // console.log(theirHandTiles);
      conn.emit('tiles', theirHandTiles);
    })
  }

}

function emitColors(socket) {
  const colors = game.players.map(player => player.colors);
  // console.log(colors);
  socket.emit('colors', colors);
}

function emitTurn(socket) {
  const playerIndex = game.whoseTurn;
  console.log('emit turn', playerIndex);
  socket.emit('turn', playerIndex);
}


function startTheGame(socket) {
  gameDB.new(); //? is a promise, but should be no need to await resolution ?

  game.setup();

  emitBoard();
  emitTiles();
  emitColors(socket);
  emitTurn(socket);

}


function handlePlaceTile({ socket, clientID }, { row, col, tile, indexInHand }) {

  if (!playerConnMap.has(clientID)) {
    return console.log("\n\t\t'@ handle Place, from unknown client!?\n\t", clientID);
  }
  
  if (!Array.isArray(tile)) {
    return console.log("\n\t\t@ handle Place, but tile not array\n\t", tile);
  }

  const playerIdx = playerConnMap.get(clientID);
  // console.log(playerIdx, { row, col, tile, indexInHand });

  // transform row/col & tile BACK to Player 1 - perspective
  const row1 = row; 
  const col1 = col;
  
  const [n,e,s,w,special] = tile;
  if (playerIdx === 1) {
    row = col1;
    col = 6 - row1;
    tile = [w, n, e, s, special];
  }
  else if (playerIdx === 2) {
    row = 6 - row1;
    col = 6 - col1;
    tile = [s, w, n, e, special];
  }
  else if (playerIdx === 3) {
    row = 6 - col1;
    col = row1;
    tile = [e, s, w, n, special];
  }

  game.checkAndPlace(playerIdx, { row, col, tile, indexInHand });

  emitBoard();
  emitTiles(clientID);
  emitColors(socket);
  emitTurn(socket);
}



module.exports = (socket) => {

  socket.on('connection', client => {

    // console.log("\nconnection", /* Object.keys(client), */ client.id, playerConnMap.size)

    const nextPlayerIdx = playerConnections.findIndex(conn => conn === null);

    if (nextPlayerIdx < 0) { // No room for another player
      console.log("\tFull game, disconnecting", client.id);
      client.disconnect();
      //? TODO: send message game is full
      return;
    }


    //* Add player connection
    console.log("\nseating", client.id, "at index", nextPlayerIdx);
    playerConnections[nextPlayerIdx] = client;
    playerConnMap.set(client.id, nextPlayerIdx);
    client.emit('seat', nextPlayerIdx);
    socket.emit('players', playerConnections.map(conn => !!conn))

    //* All Players Seated
    if (playerConnections.every(conn => conn !== null)) {
      console.log("game is ready!")
      socket.emit('ready', true);

      //! TODO: don't always restart the game just due to having a 4th player
      startTheGame(socket, playerConnections);
    }


    client.on('reconnect', () => {
      console.log("reconn?");
    })


    //* Disconnect
    client.on('disconnect', () => {
      console.log("\ndisconn", client.id);


      if (playerConnMap.has(client.id)) { // Player was seated
        console.log("\tremoving from array & map");
        playerConnMap.delete(client.id);

        const dcPlayerIdx = playerConnections.findIndex(conn => conn === client);
        playerConnections[dcPlayerIdx] = null;

        socket.emit('ready', false); // wait for full game
        socket.emit('players', playerConnections.map(conn => !!conn)); // update players joined
      }

      //? TODO: allow for reconnects
    });


    //* Interactions from Client
    client.on('place', ({ row, col, tile, indexInHand } = {}) => {
      // console.log(row, col, tile, indexInHand);
      handlePlaceTile({ socket, clientID: client.id }, { row, col, tile, indexInHand })
    });

  });
}
