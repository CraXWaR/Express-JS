const Auction = require('../models/Auction');

async function getAuctions() {
    return await Auction.find({}).lean();
}

module.exports = {
    getAuctions,
}