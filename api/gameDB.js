// require('./config/mongoose') //? assume mongoose connection has been initiated already?

const { Game, Turn } = require('./../models');


const errorLog = (title, error) => {
  console.log(`\t\t@ ${title}, error:\n`, error);
}


module.exports = {
  
  latest: () => (
    Game.findOne().sort({ _id: -1 })
      .catch(error => {
        errorLog("Game Find Latest", error)
        throw error;
      })
  ),

  byID: (_id) => (
    Game.findById(_id)
      .catch(error => {
        errorLog("Game Find by ID", error)
        throw error;
      })
  ),

  removeByID: (_id) => (
    Game.findByIdAndDelete(_id)
      .catch(error => {
        errorLog("Game Deletion", error)
        throw error;
      })
  ),

  
  new: () => (
    Game.create({})
      .catch(error => {
        errorLog("Game Creation", error)
        throw error;
      })
  ),

  end: (_id) => (
    Game.findByIdAndUpdate(_id, 
      { isEnded: true }
    ).catch(error => {
      errorLog("Game End update", error)
      throw error;
    })
  ),

  endTurn: (_id, turnDoc) => (
    Game.findByIdAndUpdate(_id, 
      { $push: { turns: turnDoc } }
    ).catch(error => {
      errorLog("Game End Turn", error)
      throw error;
    })
  ),

}
