const gameTiles = {
    "startTile": [0,2,6,4],
  
    "lakeTiles": [
      [0,0,3,6],
      [0,1,2,3],
      [0,1,5,2],
      [0,1,6,5],
      [0,2,6,4],
      [0,2,6,1],
      [0,3,2,2],
      [0,3,3,3],
      [0,3,4,5],
      [0,4,2,1],
      [0,4,5,2],
      [0,6,3,4],
      [0,6,3,5],
      [1,1,1,5],
      [1,3,4,6],
      [1,4,3,4],
      [1,4,5,6],
      [1,5,6,2],
      [1,6,2,6],
      [2,3,4,6],
      [2,3,5,4],
      [2,3,5,4],
      [4,4,6,5],
      [5,5,5,6],
  
      [0,0,3,3,"dragon"],
      [0,1,0,6,"sunflower"],
      [0,3,5,5,"dragon"],
      [0,6,6,5,"panda"],
  
      [1,1,4,2,"fish"],
      [1,4,1,4,"fish"],
      [1,3,2,3,"sunflower"],
      [1,5,2,2,"panda"],
  
      [2,4,6,4,"fish"],
      [2,6,2,6,"panda"],
      [3,5,4,5,"dragon"]
  
    ]
  }


const gameLogic = {

    gameBoard: Array(49),

    playerScores: [
        0, 0, 0, 0
    ],

    playerHands: [
        [],
        [],
        [],
        []
    ],

    playerColors: [
        {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0

        },
        {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0
        },
        {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0
        },
        {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0
        }

    ],

    pointCards: [
        [10, 9, 8, 8, 7, 7, 7, 6, 5],
        [9, 9, 8, 7, 7, 7, 6, 6, 5],
        [9, 9, 8, 7, 7, 7, 6, 6, 5],
        [4, 4, 4]
    ],

    cardsRemaining: Array(24),

    deckProgress: 0,


    turnZero: function() {

        this.playerColors[0][0]++ ;
        this.playerColors[1][2]++ ;
        this.playerColors[2][6]++ ;
        this.playerColors[3][4]++ ;

    },


    shuffle: function(a) {

for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;

    },


    setup: function() {


        const startingTile = gameTiles.startTile;
        const tiles = gameTiles.lakeTiles;

        const randIndex = Math.floor(Math.random() * tiles.length)

        // shuffle tiles

        
        // place start tile

        function placeStartingTile() {


            gameLogic.gameBoard[24] = startingTile;

            console.log("Starting Tile: " + startingTile + "\n");



        }

        // Distribute first color cards



        placeStartingTile()


        // Shuffle stack of tiles

        gameLogic.shuffle(tiles);

        // Deal three tiles per player

        function dealCard(playerID) {

            playerID.push(tiles[0]);
            tiles.shift();

        }

        for (i=0; i<3; i++) {

            dealCard(gameLogic.playerHands[0]);
            dealCard(gameLogic.playerHands[1]);
            dealCard(gameLogic.playerHands[2]);
            dealCard(gameLogic.playerHands[3]);

        }


    }


};

gameLogic.setup();
gameLogic.turnZero();

console.log(gameLogic.gameBoard[24]);
console.log( gameLogic.playerHands);
console.log(gameLogic.playerColors);