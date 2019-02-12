const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const GameSchema = new Schema({

  //* `title` is article's headline
  isEnded: {
    type: Boolean,
    required: true,
    default: false,
  },

  /* //* `turns` is array of Turn (models)
  turns: [{
    type: Schema.Types.ObjectId,
    ref: "Turn"
  }] */

  /*//? TODO:
    state: (player - points, colors, tiles; next point trade in avail, board?) 
    ^- or rather have these figured out by going through 'turns' array
    intiial setup: (# players?) who was where player order
    players (names, users)
  */

});


module.exports = mongoose.model("Game", GameSchema);
