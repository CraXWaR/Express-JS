const { getAllJobs } = require('../services/addsService');

const homeController = require('express').Router();

//TODO real controller
homeController.get('/', async (req, res) => {
    const adds = await getAllJobs();
    res.render('home', {
        title: 'Home Page',
        user: req.user,
        adds
    });
});

module.exports = homeController;