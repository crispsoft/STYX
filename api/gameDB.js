// require('./config/mongoose') //? assume mongoose connection has been initiated already?

const { Game } = require('./../models');


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

  new: () => (
    Game.create({})
      .catch(error => {
        errorLog("Game Creation", error)
        throw error;
      })
  ),

}