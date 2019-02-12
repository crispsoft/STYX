export default {
  //* Individual emits
     connect: () => ({ connection: 'connected'     }),
  disconnect: () => ({ connection: 'not connected' }),

  seat : (index) => ({ seatedAt: index+1 }), //% Client Player 1 is server's seat index 0
  board: (board) => ({ board }),
  tiles: (tiles) => ({ tilesInHand: tiles }),
  
  //* Group emits
  ready: (status) => ({ gameReady: status }),
  
  players: (statuses) => (state) => {
    const { opponents } = state;
    const { left, top, right } = opponents;

    const [lStatus, tStatus, rStatus] = [0, 1, 2].map(n => (
      statuses[(state.seatedAt + n) % 4]
        ? `Player ${(state.seatedAt + n) % 4 + 1}`
        : `..waiting..`
    ));
    
    return {
      opponents: {...opponents, 
         left: {...left , status: lStatus },
          top: {...top  , status: tStatus },
        right: {...right, status: rStatus }
      }
    }
  },

  colors: (colors) => (state) => {
    const { opponents } = state;
    const { left, top, right } = opponents;

    const [lColors, tColors, rColors] = [0, 1, 2].map(n => (
      colors[(state.seatedAt + n) % 4]
    ));
     
    return {
      opponents: {...opponents,
         left: {...left , colors: lColors },
          top: {...top  , colors: tColors },
        right: {...right, colors: rColors },
      },

      // Player's colors
      colorQtys: colors[state.seatedAt - 1] //! seatedAt values are 1,2,3,4 - colors are 0-index
    }
  },

};