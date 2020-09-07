var express = require('express');
var router = express.Router();

var bandController = require('../controllers/bandControllers');

// base URL => /band


router.route('/')
    .get(bandController.getBands)
    .post(bandController.postBand);

router.route('/register')
    .get(bandController.getRegisterBand)
    .post(bandController.postRegisterBand)

router.get('/genre/:genre', bandController.getBandsByGenre);

router.post('/add', bandController.postAddNewArtist);

router.get('/:id', bandController.getBandById);



module.exports = router;