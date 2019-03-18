export default {
  //* Individual emits
     connect: () => ({ connected: true  }),
  disconnect: () => ({ connected: false }),

  seat : (index) => {
    const relIndex = index < 0 ? 0 : index; // an index less than 0 is a spectator, whose POV will be player 1 (index 0)

    //! the values ('left','right', ) are important as they relate to other object property keys
    const oppMap = Array(4);
    oppMap[(relIndex+0)%4] = 'me'; //? unnecessary
    oppMap[(relIndex+1)%4] = 'left';
    oppMap[(relIndex+2)%4] = 'top';
    oppMap[(relIndex+3)%4] = 'right';

    return {
      seatIndex: index,
      oppMap
    }
  },

  board: (board) => ({ board }),
  tiles: (tiles) => ({ tilesInHand: tiles }),
  
  //* Group emits
  ready: (status) => ({ gameReady: status }),
  over : (status) => ({ gameOver : status }),

  turn: (index) => ({ whoseTurn: index }),
  
  players: (statuses) => (state) => {
    const { opponents } = state;
    const { left, top, right } = opponents;

    const newStatuses = {};
    statuses.forEach( (status,idx) => {
      newStatuses[state.oppMap[idx]] = status 
        ? `Player ${idx + 1}`
        : `..waiting..`
    });
    
    return {
      opponents: {...opponents, 
         left: {...left , status: newStatuses.left  },
          top: {...top  , status: newStatuses.top   },
        right: {...right, status: newStatuses.right }
      }
    }
  },

  colors: (colors) => (state) => {
    const { opponents } = state;
    const { left, top, right } = opponents;

    const newColors = {};
    colors.forEach( (colorSet,idx) => {
      newColors[state.oppMap[idx]] = colorSet
    });
     
    return {
      opponents: {...opponents,
         left: {...left , colors: newColors.left  },
          top: {...top  , colors: newColors.top   },
        right: {...right, colors: newColors.right },
      },

      // Player's colors
      colorQtys: newColors.me
    }
  },

  points: (points) => (state) => {
    const { opponents } = state;
    const { left, top, right } = opponents;


    let leaderIndices = []; // the below forEach will push 0 (index) as first element
    let leadingPoints = points[0];

    const newPoints = {};
    points.forEach( (point, idx) => {

      newPoints[state.oppMap[idx]] = point

      // update array of indices of players leading in points
      if (point > leadingPoints){
        leaderIndices = [idx]; // array of one element
        leadingPoints = point;
      }
      else if (point === leadingPoints){
        leaderIndices.push(idx);
      }

    });
     

    return {
      opponents: {...opponents,
         left: {...left , points: newPoints.left  },
          top: {...top  , points: newPoints.top   },
        right: {...right, points: newPoints.right },
      },

      // Player's points
      points: newPoints.me,

      leaderIndices
    }
  },

  trades: (tradesValues) => ({ tradesValues }),
  rounds: (currRound, remRounds) => ({ currRound, remRounds }),
};