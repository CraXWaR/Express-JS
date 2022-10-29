function hasUser() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.redirect('/auth/login'); //todo change according to task if need for redirect
        }
    };
}

function isGuest() {
    return (req, res, next) => {
        if (req.user) {
            res.redirect('/'); //todo change according to task if need for redirect
        } else {
            next(); 
        }
    };
}

module.exports = {
    hasUser,
    isGuest
};