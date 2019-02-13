const mongoose = require('mongoose');
const Schema = mongoose.Schema;


module.exports = new Schema(
  
  {
    didCollect: { type: Boolean, default: false, required: true },

    //! can't be named 'collection' (mongoDB/mongoose reserved word)
    collected: { type: [Number], required: false }, // not required (if did not collect),
    
    tilePlace: {
      type: {
        row: {type: Number, required: true },
        col: {type: Number, required: true },
        tile: {type: [], required: true } //? refactor ? it is now mixed type because of 'special'
      },
      required: true
    }
  },

  // Schema options
  { _id: false}

);