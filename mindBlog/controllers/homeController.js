const { getAllBlogs } = require('../services/blogService');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    const blogs = await getAllBlogs()
    const lastThreeBlogs = blogs.slice(-3);
    res.render('home', {
        title: 'Home Page',
        user: req.user,
        lastThreeBlogs
    });
});

module.exports = homeController;