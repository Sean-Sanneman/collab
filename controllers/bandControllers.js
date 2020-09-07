const {Artist, Band} = require('../db/models');
const {sessionChecker} = require('../config/functions');

module.exports = {
    getBands: async (req, res) => {
        try {
            if(sessionChecker(req)) {
                const artist = await Artist.findByPk(req.session.user.id, {
                    raw: true
                });
                if(!artist.band_id) {
                    res.redirect('/band/register');
                    return;
                }
                let band = await Band.findOne({
                    where: {
                        id: artist.band_id
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
            console.log(e.message);
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
            if(sessionChecker(req)) {
                res.render('band/register', {
                    title: 'Register New Band'
                })
            } else {
                res.redirect('/');
            }
        } catch (e) {
            res.render('error', {
                title: "New Band error"
            })
        }
    },
    postRegisterBand: async (req, res) => {
        try {
            if(sessionChecker(req)) {
                const band = await Band.create(req.body, {
                    raw: true
                });
                console.log(band);
                await Artist.update({
                    band_id: band.id
                }, {
                    where: {
                        id: req.session.user.id
                    }
                })
                res.redirect('/')
            }
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
    },
    getBandById: async (req, res) => {
        try {
            const band = await Band.findByPk(req.params.id, {
                raw: true
            });
            console.log(band);
            res.render('band/showBand', {
                title: "band info",
                band
            })
        } catch (e) {
            res.render('error', {
                title: "band error"
            })
        }
    }
}