const _ = {
  shuffle: require('lodash/shuffle'),
  areArraysEqual: require('lodash/isEqual')
}

const gameTiles = require('./gameTiles.json');


const BOARD_SIZE = 7;

//TODO ? enum for North, East, South, West (0,1,2,3)


module.exports = {

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

    // console.log(plyrIdx, row, col, tile, indexInHand);

    //% check conditions that would prevent this placement from happening (illegal move)

    //* Bad Types
    if ( !Number.isInteger(row)
      || !Number.isInteger(col)
      || !Number.isInteger(indexInHand)
      || !Number.isInteger(plyrIdx)) { return false; }


    if (!Array.isArray(tile) || tile.length !== 5) { return false; }

      
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
    if ( !_.areArraysEqual([n,e,s,w], [N,E,S,W])
      && !_.areArraysEqual([e,s,w,n], [N,E,S,W])
      && !_.areArraysEqual([s,w,n,e], [N,E,S,W])
      && !_.areArraysEqual([w,n,e,s], [N,E,S,W])
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

  checkAndTrade(plyrIdx, colors) {

    //* Bad Types
    if (!Number.isInteger(plyrIdx)) { return false; }
    if (!Array.isArray(colors) || colors.length !== 7) { return false; }
    
    //* wasn't this player's turn 
    if (plyrIdx !== this.whoseTurn) { return false; }


    const serversColors = this.players[plyrIdx].colors; // player's colors as server knows it

    let sum = colors.reduce((sum, curr) => sum + curr, 0);
    
    let newColors = [...serversColors];
    let tradeIndex = -1;

    switch (sum) {

      case 1: // four of 1 kind
        const idx = colors.findIndex(c => c);
        if (serversColors[idx] < 4) { return false; }

        tradeIndex = 2;        
        newColors[idx] -= 4;
        
        break;

      case 3: // 3 pairs
        if (!colors.every((c, i) => !c || serversColors[i] >= 2)) { return false; }

        tradeIndex = 1;
        newColors = serversColors.map((v, i) => colors[i] ? v - 2 : v);

        break;

      case 7: // one of each of 7
        if (!serversColors.every(c => c > 0)) { return false; }

        newColors = serversColors.map(v => v - 1);
        tradeIndex = 0

        break;

      default:
        return false; // not a valid sum/combination for trade in
    }

    //? TODO: probably more checks?

    //* PASSED ALL CHECKS


    const points = this.tradeValues[tradeIndex];
    this.players[plyrIdx].points += points;

    this.players[plyrIdx].colors = newColors;

    if (this.tradeSequences[tradeIndex].length) {
      this.tradeValues[tradeIndex] = this.tradeSequences[tradeIndex].shift()
    }
    else {
      this.tradeValues[tradeIndex] = 4;
    }

  },
  

  setup() {

    // Reset state
    this.players = [...Array(4)].map(_ => ({ //% map is necessary because nested inner array (object)
      points: 0,
      hand: [],
      // colors: Array(7).fill(0),
      colors: [4,2,1,2,1,1,1],  //! testing
      favor: 0
    })),

    this.board = Array(BOARD_SIZE * BOARD_SIZE).fill(null); //% square board

    this.tileStack = _.shuffle([...gameTiles.lakeTiles]); // Shuffle stack of tiles

    // TODO: generators?
    this.tradeSequences = [
      [10, 9, 9, 8, 8, 7, 7, 6, 5], // one each trade
      [ 9, 8, 8, 7, 7, 6, 6, 5, 5], // three pairs
      [ 8, 7, 7, 6, 6, 6, 6, 6, 4], // 4 of kind
    ],
  
    this.tradeValues = [
      this.tradeSequences[0].shift(),
      this.tradeSequences[1].shift(),
      this.tradeSequences[2].shift()
    ],


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