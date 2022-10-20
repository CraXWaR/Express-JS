const authController = require("../controllers/authController");
const bookController = require("../controllers/bookController");
const homeController = require("../controllers/homeController");

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use(bookController)
    app.get('/*', (req, res) => {
        res.render('404');
    })
};