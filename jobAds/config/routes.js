const authController = require("../controllers/authController");
const adController = require("../controllers/catalogController");
const homeController = require("../controllers/homeController");

module.exports = (app) => {
    app.use('/', homeController)
    app.use('/auth', authController)
    app.use(adController)
    app.get('/*', (req, res) => {
        res.render('404')
    })
};