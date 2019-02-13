
const gameTiles = require('./gameTiles.json');


const BOARD_SIZE = 7;

module.exports = {

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

  distributeColors([N, E, S, W, special], turn, index) {
    const { players } = this;

    
    let nTile = this.board[index-7];
    let sTile = this.board[index+7];
    let eTile = this.board[index+1];
    let wTile = this.board[index-1];


    if (turn = phturn[0]) {

      // Distributes match bonuses to player facing tile

      if ( S = sTile[0] ) {

        ++players[0].colors[S];

        // Checks for special component of placed tile & Adjacent Matching Tile

        if (special != undefined) {

          if (sTile[4] != undefined) {

            ++players[0].favor

          }

          ++players[0].favor
        };
      
      };

      if ( E = eTile[3] ) {

        ++players[0].colors[E];

        // Checks for special component of placed tile & Adjacent Matching Tile

        if (special != undefined) {

          if (eTile[4] != undefined) {

            ++players[0].favor
            
          }

          ++players[0].favor
        };

      };
      test

      if ( N = nTile[2] ) {

        ++players[0].colors[N];

        // Checks for special component of placed tile & Adjacent Matching Tile

        if (special != undefined) {

          if (nTile[4] != undefined) {

            ++players[0].favor
            
          }

          ++players[0].favor
        };

      };

      if ( W = wTile[1] ) {

        ++players[0].colors[E];

        // Checks for special component of placed tile & Adjacent Matching Tile

        if (special != undefined) {

          if (wTile[4] != undefined) {

            ++players[0].favor
            
          }

          ++players[0].favor

        };

      };
      

      


    }else if (turn = phturn[1]){  if ( S = sTile[0] ) {

        ++players[1].colors[S];

        // Checks for special component of placed tile & Adjacent Matching Tile

        if (special != undefined) {

          if (sTile[4] != undefined) {

            ++players[1].favor

          }

          ++players[1].favor
        };

        if ( E = eTile[3] ) {

          ++players[1].colors[E];
  
          // Checks for special component of placed tile & Adjacent Matching Tile
  
          if (special != undefined) {
  
            if (eTile[4] != undefined) {
  
              ++players[1].favor
              
            }
  
            ++players[1].favor
          };
  
        };
        
  
        if ( N = nTile[2] ) {
  
          ++players[1].colors[N];
  
          // Checks for special component of placed tile & Adjacent Matching Tile
  
          if (special != undefined) {
  
            if (nTile[4] != undefined) {
  
              ++players[1].favor
              
            }
  
            ++players[1].favor
          };
  
        };
  
        if ( W = wTile[1] ) {
  
          ++players[1].colors[E];
  
          // Checks for special component of placed tile & Adjacent Matching Tile
  
          if (special != undefined) {
  
            if (wTile[4] != undefined) {
  
              ++players[1].favor
              
            }
  
            ++players[1].favor
            
          };
  
        };
      
      };
    }else if (turn = phturn[2]){

      if ( S = sTile[0] ) {

        ++players[2].colors[S];

        // Checks for special component of placed tile & Adjacent Matching Tile

        if (special != undefined) {

          if (sTile[4] != undefined) {

            ++players[2].favor

          }

          ++players[2].favor
        };
      
      };

      if ( E = eTile[3] ) {

        ++players[2].colors[E];

        // Checks for special component of placed tile & Adjacent Matching Tile

        if (special != undefined) {

          if (eTile[4] != undefined) {

            ++players[2].favor
            
          }

          ++players[2].favor
        };

      };
      test

      if ( N = nTile[2] ) {

        ++players[2].colors[N];

        // Checks for special component of placed tile & Adjacent Matching Tile

        if (special != undefined) {

          if (nTile[4] != undefined) {

            ++players[2].favor
            
          }

          ++players[2].favor
        };

      };

      if ( W = wTile[1] ) {

        ++players[2].colors[E];

        // Checks for special component of placed tile & Adjacent Matching Tile

        if (special != undefined) {

          if (wTile[4] != undefined) {

            ++players[2].favor
            
          }

          ++players[2].favor
          
        };

      };

    }else if (turn = phturn[3]){

      if ( S = sTile[0] ) {

        ++players[3].colors[S];

        // Checks for special component of placed tile & Adjacent Matching Tile

        if (special != undefined) {

          if (sTile[4] != undefined) {

            ++players[3].favor

          }

          ++players[3].favor
        };
      
      };

      if ( E = eTile[3] ) {

        ++players[3].colors[E];

        // Checks for special component of placed tile & Adjacent Matching Tile

        if (special != undefined) {

          if (eTile[4] != undefined) {

            ++players[3].favor
            
          }

          ++players[3].favor
        };

      };
      

      if ( N = nTile[2] ) {

        ++players[3].colors[N];

        // Checks for special component of placed tile & Adjacent Matching Tile

        if (special != undefined) {

          if (nTile[4] != undefined) {

            ++players[3].favor
            
          }

          ++players[3].favor
        };

      };

      if ( W = wTile[1] ) {

        ++players[3].colors[E];

        // Checks for special component of placed tile & Adjacent Matching Tile

        if (special != undefined) {

          if (wTile[4] != undefined) {

            ++players[3].favor
            
          }

          ++players[3].favor
          
        };

      };

    }else {

      console.log("you done messed up a-aron")

    }
    // TODO: including 'special' tiles
    // TODO: check color supplies
    

    // TODO: distribute colors in clockwise order starting with player who placed tile (can affect supply constraints)
    ++players[0].colors[S];
    ++players[1].colors[W];
    ++players[2].colors[N];
    ++players[3].colors[E];
  },

 

  addTileToBoard({ row, col, tile }) {
    const sz = BOARD_SIZE;
    const { board }  = this;


    if (board[row * sz + col].isBorder = true) {

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

    this.distributeColors(tile);

  }else {
    return;
  }
  },

  setup() {
    // Reset state
    this.players = [...Array(4)].map(_ => ({ //% map is necessary because nested inner array (object)
      score: 0,
      hand: [],
      colors: Array(7).fill(0),
    })),
    this.tileStack = [...gameTiles.lakeTiles];


    // Shuffle stack of tiles
    this.shuffle(this.tileStack);

    // Deal three tiles per player
    this.players.forEach(player => {
      player.hand = this.tileStack.splice(0,3);
    });
    
    
    // place start tile (center at (3,3), with 0-indexed based row/col)
    this.addTileToBoard({ row: 3, col: 3, tile: gameTiles.startTile });

    // Distribute first color cards
    
  }
};