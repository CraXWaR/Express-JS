const Auction = require('../models/Auction');

async function getAuctions() {
    return await Auction.find({}).lean();
}

async function getAuctionById(id) {
    return await Auction.findById(id).lean();
}

async function createAuction(auction) {
    return Auction.create(auction);
}

async function bidAuction(auctionId, userId) {
    const auction = await Auction.findById(auctionId);
    auction.biddList.push(userId);
    await auction.save();
}

module.exports = {
    getAuctions,
    getAuctionById,
    createAuction,
    bidAuction
}