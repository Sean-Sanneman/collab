module.exports = {
    sessionChecker: (req) => {
        return !!(req.session.user && req.cookies.user_sid);
    }
}