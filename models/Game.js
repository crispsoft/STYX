const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TurnSchema = require('./TurnSchema');


const GameSchema = new Schema({

  //* `isEnded` is flag for if game has ended 
  isEnded: {
    type: Boolean,
    required: true,
    default: false,
  },

  //* `turns` is array of Turn (models) 
  turns: [TurnSchema]

  /*//? TODO:
    state: (player - points, colors, tiles; next point trade in avail, board?) 
    ^- or rather have these figured out by going through 'turns' array
    intiial setup: (# players?) who was where player order
    players (names, users)
  */

});


module.exports = mongoose.model("Game", GameSchema);
