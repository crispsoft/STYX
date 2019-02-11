
const gameTiles = require('./gameTiles.json');

module.exports = {

  gameBoard: Array(49),
  
  playerScores: [0, 0, 0, 0],

  playerHands: [
    [], [], [], []
  ],

  playerColors: [
    Array(7).fill(0),
    Array(7).fill(0),
    Array(7).fill(0),
    Array(7).fill(0),
  ],

  pointCards: [
    [10, 9, 8, 8, 7, 7, 7, 6, 5],
    [9, 9, 8, 7, 7, 7, 6, 6, 5],
    [9, 9, 8, 7, 7, 7, 6, 6, 5],
    [4, 4, 4]
  ],

  cardsRemaining: Array(24),

  deckProgress: 0,



  turnZero() {

    this.playerColors[0][0]++;
    this.playerColors[1][2]++;
    this.playerColors[2][6]++;
    this.playerColors[3][4]++;

  },


  shuffle(a) {

    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;

  },


  setup() {

    const startingTile = gameTiles.startTile;
    const tiles = gameTiles.lakeTiles;

    const randIndex = Math.floor(Math.random() * tiles.length)

    // shuffle tiles


    // place start tile
    this.gameBoard[24] = startingTile;


    // Distribute first color cards


    // Shuffle stack of tiles
    this.shuffle(tiles);


    // Deal three tiles per player
    function dealCard(playerID) {
      playerID.push(tiles[0]);
      tiles.shift();
    }

    for (i = 0; i < 3; i++) {
      dealCard(this.playerHands[0]);
      dealCard(this.playerHands[1]);
      dealCard(this.playerHands[2]);
      dealCard(this.playerHands[3]);
    }
  }
};