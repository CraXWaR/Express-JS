const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");
const houseingController = require("../controllers/houseingController");

module.exports = (app) => {
    app.use('/', homeController)
    app.use('/auth', authController)
    app.use(houseingController)
    app.get('/*', (req, res) => {
        res.render('404')
    })
};