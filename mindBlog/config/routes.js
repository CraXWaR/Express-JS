const authController = require("../controllers/authController");
const blogController = require("../controllers/blogController");
const homeController = require("../controllers/homeController");

module.exports = (app) => {
    app.use('/', homeController)
    app.use('/auth', authController)
    app.use(blogController)
    app.get('/*', (req, res) => {
        res.render('404')
    })
};