const {Artist, Band} = require('../db/models');
const {sessionChecker} = require('../config/functions')


module.exports = {
    getIndex: (req, res) => {
        res.render('index', {
            title: "Collab.com"
        })
    },
    getLogout: async (req, res) => {
        try {
            if(sessionChecker(req)) {
                res.clearCookie('user_sid');
                res.redirect('/');
            } else {
                res.render('error', {
                    title: 'error'
                })
            }
        } catch (e) {
            console.log(e.message);
            res.render('error', {
                title: 'error',
            });
        }
    }
}