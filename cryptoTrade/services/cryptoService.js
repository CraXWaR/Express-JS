const Crypto = require('../models/Crypto');

async function getAllCrypto() {
    return await Crypto.find({}).lean();
}

async function createCrypto(crypto) {
    return Crypto.create(crypto)
}

module.exports = {
    getAllCrypto,
    createCrypto,
}