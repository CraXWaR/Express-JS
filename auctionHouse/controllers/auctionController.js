const { getAuctions } = require('../services/auctionService');

const auctionController = require('express').Router();

auctionController.get('/catalog', async (req, res) => {
    const auctions = await getAuctions();
    res.render('browse', {
        title: 'Auction Catalog',
        user: req.user,
        auctions
    })
});

module.exports = auctionController;