const router = require('express').Router();

const gameDB = require('./../api/gameDB');

router.get('/test', (req, res) => {
  res.json({'a': 'AAAA-OK'});
})


router.get('/games/latest', async (req, res) => {

  try {
    const latestGameObj = await gameDB.latest();

    return res.json(latestGameObj);
  }

  catch (error) {
    console.log("\t\t@ GET /games/latest:\n", error);
    res.status(500).send("Internal Games retrieval Error");
  }

})


/* router.route('/games')
  .all((req, res, next) => {
    next();
  })

  //* GET
  .get((req, res) => {
    res.json({ 'b': 'cool' })
  })

; // router.route('/') */

module.exports = router;


