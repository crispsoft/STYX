const areArraysEqual = require('lodash/isEqual');

const gameTiles = require('./gameTiles.json');


const BOARD_SIZE = 7;

//TODO ? enum for North, East, South, West (0,1,2,3)


module.exports = {

  whoseTurn: NaN,

  board: Array(BOARD_SIZE * BOARD_SIZE), //% square board

  players: [...Array(4)].map(_ => ({ //% map is necessary because nested inner array (object)
    score: 0,
    hand: [],
    favor: 0,
    colors: Array(7).fill(0),
  })),


  pointCards: [
    [10, 9, 8, 8, 7, 7, 7, 6, 5],
    [9, 9, 8, 7, 7, 7, 6, 6, 5],
    [9, 9, 8, 7, 7, 7, 6, 6, 5],
    [4, 4, 4]
  ],

  tileStack: null,

  deckProgress: 0,


  shuffle(a) {

    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;

  },

  distributeColors(plyrIdx, {row, col, tile}) {

    // TODO: check color supplies


    [N, E, S, W, special] = tile;

    const { players } = this;
    const player = players[plyrIdx];
    const sz = BOARD_SIZE;


    const nTile = (row >  0) && this.board[(row-1)*sz + col  ];
    const sTile = (row < sz) && this.board[(row+1)*sz + col  ];
    const wTile = (col >  0) && this.board[ row   *sz + col-1];
    const eTile = (col < sz) && this.board[ row   *sz + col+1];
    
    let wasOneMatch = false;

    // Tile that is north of that placed, south color
    if (nTile && N === nTile[2]) { 
      wasOneMatch = true;

      ++player.colors[N];

      // Checks for special component of Adjacent Matching Tile
      if (nTile[4]) { ++player.favor }
    }

    if (eTile && E === eTile[3]) {
      wasOneMatch = true;

      ++player.colors[E];

      // Checks for special component of Adjacent Matching Tile
      if (eTile[4]) { ++player.favor }
    }

    if (sTile && S === sTile[0]) {
      wasOneMatch = true;

      ++player.colors[S];

      // Checks for special component of Adjacent Matching Tile
      if (sTile[4]) { ++player.favor }
    }

    if (wTile && W === wTile[1]) {
      wasOneMatch = true;

      ++player.colors[W];

      // Checks for special component of Adjacent Matching Tile
      if (sTile[4]) { ++player.favor }
    }

    // If there was one adjacent match, and the newly placed tile was special, gain one favor for the new tile
    if (wasOneMatch && special) { ++player.favor }


    // TODO: distribute colors in clockwise order starting with player who placed tile (can affect supply constraints)
    ++players[0].colors[S];
    ++players[1].colors[W];
    ++players[2].colors[N];
    ++players[3].colors[E];
  },


  addTileToBoard(plyrIdx, { row, col, tile }) {
    const sz = BOARD_SIZE;
    const { board } = this;

    board[row * sz + col] = tile;

    // Extend borders if not a tile or already a border
    // include check for edge of board
    //? another configuration to signify border tile
    //? should the gamelogic be concerned with bordertiles -- probably, needs to check anyway
    if ((row + 1) < sz) {
      board[(row + 1) * sz + col] =
        board[(row + 1) * sz + col] || { isBorder: true };
    }
    if (row - 1 >= 0) {
      board[(row - 1) * sz + col] =
        board[(row - 1) * sz + col] || { isBorder: true };
    }
    if ((col + 1) < sz) {
      board[(row) * sz + col + 1] =
        board[(row) * sz + col + 1] || { isBorder: true };
    }
    if (col - 1 >= 0) {
      board[(row) * sz + col - 1] =
        board[(row) * sz + col - 1] || { isBorder: true };
    }

    this.distributeColors(plyrIdx, { row, col, tile });
  },

  checkAndPlace(plyrIdx, { row, col, tile, indexInHand } = {}) {

    console.log(plyrIdx, row, col, tile, indexInHand);

    //% check conditions that would prevent this placement from happening (illegal move)

    //* Bad Types
    if ( !Number.isInteger(row)
      || !Number.isInteger(col)
      || !Number.isInteger(indexInHand)
      || !Number.isInteger(plyrIdx)) { return false; }


    if (!Array.isArray(tile) && tile.length !== 5) { return false; }

      
    //* Bad Ranges
    if ( row < 0 || row >= BOARD_SIZE
      || col < 0 || col >= BOARD_SIZE) { return false; }


    //* Board & 'whose-turn' server states do not agree
    const boardIdx = row * BOARD_SIZE + col;
    if (// wasn't a border tile 
         !this.board[boardIdx] 
      || !this.board[boardIdx].isBorder 
        // wasn't this player's turn 
      || plyrIdx !== this.whoseTurn 
    ) { return false; }


    const serversTile = this.players[plyrIdx].hand[indexInHand]; // tile in player's hand as server knows it

    //* There is no tile in the player's hand at that index 
    if (!serversTile) { return false; }

    //* Check if the (possibly rotated) tile that is being placed agrees with server
    const [N, E, S, W, special] = serversTile;
    const [n, e, s, w, spec] = tile;
    if ( !areArraysEqual([n,e,s,w], [N,E,S,W])
      && !areArraysEqual([e,s,w,n], [N,E,S,W])
      && !areArraysEqual([s,w,n,e], [N,E,S,W])
      && !areArraysEqual([w,n,e,s], [N,E,S,W])
      ) { return false; }
    if (!!special !== !!spec) { return false; }


    //? TODO: probably more checks?


    //* Remove tile from player's hand
    this.players[plyrIdx].hand.splice(indexInHand,1); 


    //* Add tile to board (also distributes colors)
    this.addTileToBoard(plyrIdx, { row, col, tile });


    //! TODO: add a new tile from the stack to player's hand, check remaining stack

    //! TODO: if game not over check,

    //% Advance whose turn it is
    this.whoseTurn = (this.whoseTurn + 1) % 4;
    
    return true;
  },

  setup() {
    // Reset state
    this.players = [...Array(4)].map(_ => ({ //% map is necessary because nested inner array (object)
      score: 0,
      hand: [],
      colors: Array(7).fill(0),
    })),
    this.tileStack = [...gameTiles.lakeTiles];
    this.board = Array(BOARD_SIZE * BOARD_SIZE).fill(null);


    // Shuffle stack of tiles
    this.shuffle(this.tileStack);

    // Deal three tiles per player
    this.players.forEach(player => {
      player.hand = this.tileStack.splice(0,3);
    });
    
    
    // place start tile (center at (3,3), with 0-indexed based row/col)
    this.addTileToBoard(NaN, { row: 3, col: 3, tile: gameTiles.startTile });

    // signify that first player is whose turn it is
    this.whoseTurn = 0;
  }

};