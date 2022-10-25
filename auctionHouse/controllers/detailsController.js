const { hasUser } = require('../middlewares/guards');
const { getAuctionById, bidAuction } = require('../services/auctionService');

const detailsController = require('express').Router();


detailsController.get('/details/:id', async (req, res) => {
    const auction = await getAuctionById(req.params.id);
    let view;

    if (req.user._id) {
        auction.isOwner = auction.owner.toString() == req.user._id.toString();
        auction.isBid = auction.biddList.some((id) => id == req.user._id);

        if (auction.isOwner) {
            view = 'details-owner'
        } else {
            view = 'details'
        }
        res.render(view, {
            title: auction.title,
            user: req.user,
            auction
        });
    }
});

detailsController.get('/details/:id/bid', hasUser(), async (req, res) => {
    await bidAuction(req.params.id, req.user._id);
    res.redirect(`/details/${req.params.id}`);
});

module.exports = detailsController;