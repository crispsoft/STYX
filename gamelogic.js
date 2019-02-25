//% lodash object
const _ = {
  shuffle: require('lodash/shuffle'),
  areArraysEqual: require('lodash/isEqual')
}

const gameTiles = require('./gameTiles.json');


const BOARD_SIZE = 7;

//? TODO ? enum for North, East, South, West (0,1,2,3)


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
      if (wTile[4]) { ++player.favor }
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


  canTrade1All: (colors) => colors.every(c => c > 0),

  canTrade3Pair: (colors) => 3 <= colors.reduce((pairs, c) => pairs + (c >= 2), 0),

  canTrade4Kind: (colors) => colors.some(c => c >= 4),

  canTradeIn(colors) {
    return (
       this.canTrade1All(colors)
    || this.canTrade3Pair(colors)
    || this.canTrade4Kind(colors)
  )},

  advanceTurnIfCantTrade() {
    //% We are in the final round - trade-in's only.
    //% If the current player can't do a trade in, auto advance to next player

    let tryPlayer = this.whoseTurn;
    while(tryPlayer < 4 && !this.canTradeIn(this.players[tryPlayer].colors)) {
      ++tryPlayer;
    }

    if (tryPlayer >= 4) {
      this.isOver = true;
      // console.log("GAMEOVER");
      this.whoseTurn = -1; //TODO: problems with this?
    }
    else {
      this.whoseTurn = tryPlayer;
    }

  },

  checkAndPlace(plyrIdx, { row, col, tile, indexInHand } = {}) {
    // console.log("\n\t\tCheck\n", plyrIdx, row, col, tile, indexInHand);
    
    //% Check conditions that would prevent this placement from happening (illegal move)

    if (this.isOver) { return false; }

    //* Bad Types
    if ( !Number.isInteger(row)
      || !Number.isInteger(col)
      || !Number.isInteger(indexInHand)
      || !Number.isInteger(plyrIdx)) { return false; }

    if (!Array.isArray(tile) || tile.length > 5 || tile.length < 4) { return false; }
    //! TODO: refactor tile config for special to be prop (not part of array)

      
    //* Bad Ranges
    if ( row < 0 || row >= BOARD_SIZE
      || col < 0 || col >= BOARD_SIZE) { return false; }


    //* Board & 'whose-turn' server states do not agree
    const boardIdx = row * BOARD_SIZE + col;
    if ( !this.board
      || !this.board[boardIdx]          // no tile here (null/undefined)
      || !this.board[boardIdx].isBorder // tile here isn't a border
      || plyrIdx !== this.whoseTurn     // wasn't this player's turn  
    ) { return false; }


    //% reference for the tile inthis  player's hand as server knows it
    const serversTile = this.players[plyrIdx].hand[indexInHand]; 


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


    //* Remove tile from player's hand, insert one from top of shuffled stack
    if (this.tileStack.length){
      this.players[plyrIdx].hand.splice(indexInHand, 1, this.tileStack.shift());
    }
    else {
      this.players[plyrIdx].hand.splice(indexInHand, 1);
    }


    //* Add tile to board (also distributes colors)
    this.addTileToBoard(plyrIdx, { row, col, tile });

    //% Advance whose turn it is
    this.whoseTurn = (this.whoseTurn + 1) % 4;

    // first player's turn and they have no hands in tile
    if (this.whoseTurn === 0 && this.players[0].hand.length === 0) {
      this.advanceTurnIfCantTrade();
    }
    
    return true;
  },

  checkAndTrade(plyrIdx, colors) {

    if (this.isOver) { return false; }

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
        if (!this.canTrade1All(serversColors)) { return false; }

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

    if (!this.players[plyrIdx].hand.length) {
      // this is a last round trade-in, and should advance player turn
      // ++this.whoseTurn; //? this allows for only ONE trade in during last round
      this.advanceTurnIfCantTrade();
    }

    return true;
  },
  

  setup() {

    // Reset state
    this.isOver = false;

    this.players = [...Array(4)].map(_ => ({ //% map is necessary because nested inner array (object)
      points: 0,
      hand: [],
      colors: Array(7).fill(0),
      // colors: [4,2,1,2,1,1,1],  //! for testing
      favor: 0
    })),

    this.board = Array(BOARD_SIZE * BOARD_SIZE).fill(null); //% square board

    // this.tileStack = _.shuffle([...gameTiles.lakeTiles]).slice(0,4); //!testing (advances to last 1+1 round game)
    // this.tileStack = _.shuffle([...gameTiles.lakeTiles]).slice(3,15); //!testing (advances to last 3+1 rounds game)
    this.tileStack = _.shuffle([...gameTiles.lakeTiles]).slice(3); // Shuffle stack of tiles, remove some tiles to make stack a multiple of # players (4 players => 32 tiles => 35 less 3 tiles)
    

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
      // player.hand = this.tileStack.splice(0,1); //!testing
      player.hand = this.tileStack.splice(0,3);
    });    
    
    // place start tile (center at (3,3), with 0-indexed based row/col)
    this.addTileToBoard(NaN, { row: 3, col: 3, tile: gameTiles.startTile });

    // signify that first player is whose turn it is
    this.whoseTurn = 0;
  }

};