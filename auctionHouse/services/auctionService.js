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

async function deleteAuction(id) {
    return await Auction.findByIdAndDelete(id);
}

async function editAuction(id, data) {
    const existingAuction = await Auction.findById(id);

    existingAuction.title = data.title;
    existingAuction.category = data.category;
    existingAuction.imageUrl = data.imageUrl;
    existingAuction.price = data.price;
    existingAuction.description = data.description;

    existingAuction.save();
}

module.exports = {
    getAuctions,
    getAuctionById,
    createAuction,
    bidAuction,
    deleteAuction,
    editAuction
}