const {Artist, Band} = require('../db/models');
const {sessionChecker} = require('../config/functions');

module.exports = {
    getBands: async (req, res) => {
        try {
            if(sessionChecker(req)) {
                let band = await Band.findOne({
                    where: {
                        id: req.session.user.band_id
                    },
                    raw: true
                });
                res.render('band/index', {
                    title: "Band",
                    band
                })
            } else {
                res.redirect('/')
            }
        } catch (e) {
            res.render('error', {
                title: "Bands error"
            })
        }
    },
    postBand: async (req, res) => {
        try {
            if(sessionChecker(req)) {
                const band = await Band.update(req.body, {
                    where: {
                        id: req.session.user.band_id
                    }
                });
                console.log(band);
                res.redirect('/');
            } else {
                res.redirect('/band');
            }
        } catch (e) {
            res.render('error', {
                title: "Bands error"
            })
        }
    },
    getBandsByGenre: async (req, res) => {
        try {
            let bands = await Band.findAll({
                where: {
                    genre: req.params.genre
                },
                include: [
                    {model: Artist, as: 'artists'}
                ]
            });
            bands = bands.map(band => band.toJSON());
            res.render('band/index', {
                title: "Band",
                bands
            });
        } catch (e) {
            res.render('error', {
                title: "Bands error"
            })
        }
    },
    getRegisterBand: async (req, res) => {
        try {
            res.render('band/register', {
                title: 'Register New Band'
            })
        } catch (e) {
            res.render('error', {
                title: "New Band error"
            })
        }
    },
    postRegisterBand: async (req, res) => {
        try {
            await Band.create(req.body);
            res.redirect('/')
        } catch (e) {
            res.status(500).render('error', {
                title: "New Band error"
            })
        }
    },
    postAddNewArtist: async (req, res) => {
        /*
        req.body should be like this:
        {
            band_id: sequelize.DataType.INTEGER,
            artist_id: sequelize.DataType.INTEGER
        }
        */
        const {band_id, artist_id} = req.body;
        try {
            await Artist.update({
                band_id: band_id
            }, {
                where: {
                    id: artist_id
                }
            });
            res.redirect('/band');
        } catch (e) {
            res.render('error', {
                title: "Add Band error"
            })
        }
    }
}