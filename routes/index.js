var express = require('express');
var router = express.Router();

const indexRouter = require('./indexRouter');
const artistRouter = require('./artist');
const bandRouter = require('./band');

router.use('*', (req, res, next) => {
    if(req.session.user && req.cookies.user_sid) {
        res.locals.user = req.session.user
    }
    next();
})
router.use("/", indexRouter);
router.use("/artist", artistRouter);
router.use("/band", bandRouter);


module.exports = router;
