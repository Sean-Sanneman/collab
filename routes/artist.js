var express = require('express');
var router = express.Router();

const artistController = require('../controllers/artistControllers');

// base URL => /artist

router.route('/')
    .get(artistController.getArtist)
    .post(artistController.postArtist)


router.route('/register')
    .get(artistController.getRegister)
    .post(artistController.postRegister);

router.route('/login')
    .post(artistController.postLogin);

router.route('/search/instrument')
    .post(artistController.postSearchByInstrument);

router.route('/search/genre')
    .post(artistController.postSearchByGenre);

router.route('/search/bandgenre')
    .post(artistController.postSearchByBandGenre);


router.route('/:id')
    .get(artistController.getArtistById);

module.exports = router;