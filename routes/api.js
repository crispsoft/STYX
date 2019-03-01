const router = require('express').Router();

const gameDB = require('./../api/gameDB');


router.get('/games/latest', async (req, res) => {

  try {
    const latestGameObj = await gameDB.latest();

    return res.json(latestGameObj);
  }

  catch (error) {
    console.log("\t\t@ GET /games/latest, error:\n", error);
    res.status(500).send({ message: "Internal Games retrieval Error" });
  }

})


router.get('/games/:id', async ({ params: { id } }, res) => {

  try {
    const gameObj = await gameDB.byID(id);

    return res.json(gameObj);
  }

  catch (error) {
    console.log("\t\t@ GET /games/:id, error:\n", error);
    res.status(500).send({ message: "Internal Games retrieval Error" });
  }

})


module.exports = router;
