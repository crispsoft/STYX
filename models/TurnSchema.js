const mongoose = require('mongoose');
const Schema = mongoose.Schema;


module.exports = new Schema(
  
  {

    playerIdx: {
      type: Number,
      required: true
    },

    trades: { type: [[Number]], required: false }, // not required (if did not trade),
    
    tilePlace: {
      type: {
        row: {type: Number, required: true },
        col: {type: Number, required: true },
        tile: {type: [], required: true } //TODO? refactor? it is now mixed type because of 'special'
      },
      required: false
    }
    
  },

  // Schema options
  { _id: false}

);