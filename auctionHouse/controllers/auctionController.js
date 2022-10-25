const { hasUser } = require('../middlewares/guards');
const { getAuctions, createAuction, } = require('../services/auctionService');

const auctionController = require('express').Router();

auctionController.get('/catalog', async (req, res) => {
    const auctions = await getAuctions();
    res.render('browse', {
        title: 'Auction Catalog',
        user: req.user,
        auctions
    })
});

auctionController.get('/create', hasUser(), (req, res) => {
    res.render('create', {
        title: 'Auction Create',
        user: req.user
    })
});

auctionController.post('/create', async (req, res) => {
    const auction = {
        title: req.body.title,
        category: req.body.category,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        description: req.body.description,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        owner: req.user._id
    };

    try {
        await createAuction(auction);
        res.redirect('/catalog');
    } catch (error) {
        res.render('create', {
            title: 'Auction Create',
            body: bauctionook,
            errors: parseError(error)
        })
    }
});

module.exports = auctionController;