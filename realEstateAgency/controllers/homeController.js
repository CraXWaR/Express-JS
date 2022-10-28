const { getAllHouses } = require('../services/housingService');

const homeController = require('express').Router();

//TODO real controller
homeController.get('/', async (req, res) => {
    const houses = await getAllHouses();
    res.render('home', {
        title: 'Home Page',
        user: req.user,
        houses
    });
});

module.exports = homeController;