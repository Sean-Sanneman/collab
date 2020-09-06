const {Artist, Band} = require('../db/models');
const {sessionChecker} = require('../config/functions');

module.exports = {
    getArtist: async (req, res) => {
        try {
            if(sessionChecker(req)) {
                const artist = await Artist.findOne({
                    where: {
                        id: req.session.user.id
                    },
                    include: [Band],
                    raw: true,
                    nest: true
                });
                const bands = await Band.findAll({
                    raw: true
                });
                res.render('artist/index', {
                    title: "Artist",
                    artist,
                    bands
                });
            } else {
                res.redirect('/')
            }
        } catch (e) {
            res.render('error', {
                title: "Artist"
            })
        }
    },
    // getEditArtistForm: async (req, res) => {
    //     try {
    //         if(sessionChecker(req)) {
    //             res.render('artist/edit', {
    //                 title: "Edit Artist",
    //             })
    //         } else {
    //             res.redirect('/artist/login')
    //         }
    //     } catch (e) {
    //         res.render('error', {
    //             title: "Artist"
    //         })
    //     }
    // },
    postArtist: async (req, res) => {
        try {
            if(sessionChecker(req)) {
                const artist = await Artist.update(req.body, {
                    where: {
                        id: req.session.user.id
                    }
                });
                req.session.user = artist.dataValues;
                res.locals.user = artist.dataValues;
                res.redirect('/artist');
            } else {
                res.redirect('/')
            }
        } catch (e) {
            res.render('error', {
                title: "Artist"
            })
        }
    },
    getRegister: async (req, res) => {
        try {
            const bands = await Band.findAll({
                raw: true
            });
            res.render('artist/register', {
                title: "Register New Artist",
                bands
            })
        } catch (e) {
            console.log(e.message);
            res.render('error', {
                title: 'error'
            });
        }
    },
    postRegister: async (req, res) => {
        try {
            if(sessionChecker(req)) {
                res.json({
                    message: "you are already logged in! please logout first",
                });
            } else {
                const user = await Artist.findOne({
                    where: {
                        username: req.body.username
                    }
                });
                if(user) {
                    res.render('error', {
                        title: 'error'
                    });
                } else {
                    const newUser = await Artist.create(req.body)
                    req.session.user = newUser.dataValues;
                    res.locals.user = newUser.dataValues;
                    res.redirect('/');
                }
            }
        } catch (e) {
            console.log(e.message);
            res.render('error', {
                title: 'error'
            });
        }
    },
    postLogin: async (req, res) => {
        try {
            if(sessionChecker(req)) {
                res.redirect('/');
            } else {
                const {username, password} = req.body;
                const artist = await Artist.findOne({
                    where: {
                        username: username
                    }
                });
                if(artist.validPassword(password)) {
                    req.session.user = artist.dataValues;
                    res.locals.user = artist.dataValues;
                    res.redirect('/');
                } else {
                    res.render('error', {
                        title: "Login",
                        message: "username or password is incorrect!!"
                    })
                }
            }
        } catch (e) {
            console.log(e.message);
            res.render('error', {
                title: 'error',
            });
        }
    },
    getArtistProfilePublic: async (req, res) => {

    },
    postSearchByInstrument: async (req, res) => {
        try {
            let artists = await Artist.findAll({
                where: {
                    instrument: req.body.instrument
                }
            });
            artists = artists.map(artist => {
                let tmp = artist.toJSON();
                return {
                    id: tmp.id,
                    name: `${tmp.firstName} ${tmp.lastName}`
                }
            });
            res.json({
                artists
            });
        } catch (e) {
            res.json({
                status: 'error',
                message: e.message
            })
        }
    },
    postSearchByGenre: async (req, res) => {
        try {
            let artists = await Artist.findAll({
                where: {
                    genre: req.body.genre
                }
            });
            artists = artists.map(artist => {
                let tmp = artist.toJSON();
                return {
                    id: tmp.id,
                    name: `${tmp.firstName} ${tmp.lastName}`
                }
            });
            res.json({
                artists
            });
        } catch (e) {
            res.json({
                status: 'error',
                message: e.message
            })
        }
    },
    postSearchByBandGenre: async (req, res) => {
        try {
            let artists = await Artist.findAll({
                include: Band,
                raw: true,
                where: {
                    '$band.genre$': req.body.bandGenre
                }
            });
            artists = artists.map(artist => {
                return {
                    id: artist.id,
                    name: `${artist.firstName} ${artist.lastName}`
                }
            });
            res.json({
                artists
            });
        } catch (e) {
            res.json({
                status: 'error',
                message: e.message
            })
        }
    }
}