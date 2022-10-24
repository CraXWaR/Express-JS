const Crypto = require('../models/Crypto');

async function getAllCrypto() {
    return await Crypto.find({}).lean();
}

async function createCrypto(crypto) {
    return Crypto.create(crypto)
}

async function getCryptoById(id) {
    return await Crypto.findById(id).lean();
}

module.exports = {
    getAllCrypto,
    createCrypto,
    getCryptoById
}