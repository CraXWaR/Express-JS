const { hasUser } = require('../middlewares/guards');
const { getAuctionById, bidAuction, deleteAuction, editAuction } = require('../services/auctionService');
const { parseError } = require('../util/parser');

const detailsController = require('express').Router();


detailsController.get('/details/:id', async (req, res) => {
    const auction = await getAuctionById(req.params.id);
    let view;

    auction.isOwner = auction.owner?.toString() == req.user?._id.toString();
    auction.isBid = auction.biddList.some((id) => id == req.user?._id);

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
});

detailsController.get('/details/:id/bid', hasUser(), async (req, res) => {
    await bidAuction(req.params.id, req.user._id);
    res.redirect(`/details/${req.params.id}`);
});

detailsController.get('/details/:id/delete', async (req, res) => {
    const auction = await getAuctionById(req.params.id);

    if (auction.owner.toString() != req.user._id.toString()) {
        return res.redirect('/auth/login');
    }
    await deleteAuction(req.params.id);
    res.redirect('/catalog')
});

detailsController.get('/details/:id/edit', async (req, res) => {
    const auction = await getAuctionById(req.params.id);

    if (auction.owner.toString() != req.user._id.toString()) {
        return res.redirect('/auth/login');
    }

    res.render('edit', {
        title: 'Edit Auction',
        user: req.user,
        auction
    })
});

detailsController.post('/details/:id/edit', async (req, res) => {
    const auction = await getAuctionById(req.params.id);

    try {
        await editAuction(req.params.id, req.body);
        res.redirect(`/details/${req.params.id}`);
    } catch (error) {
        res.render('edit', {
            title: 'Edit Auction',
            user: req.user,
            errors: parseError(error),
            auction
        })
    }
});

module.exports = detailsController;