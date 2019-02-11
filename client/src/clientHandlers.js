export default {
  //* Individual emits
     connect: () => ({ connection: 'connected'     }),
  disconnect: () => ({ connection: 'not connected' }),

  seat : (index) => ({ seatedAt: index+1 }), //% Client Player 1 is server's seat index 0
  board: (board) => ({ board }),
  
  //* Group emits
  ready: (status) => ({ gameReady: status }),

  players: (names) => (state) => {
    const [left, top, right] = [0, 1, 2].map(n => (
      names[(state.seatedAt + n) % 4]
        ? `Player ${(state.seatedAt + n) % 4 + 1}`
        : `waiting..`
    ));
    
    return {
      names: { left, top, right }
    }
  },

  

};