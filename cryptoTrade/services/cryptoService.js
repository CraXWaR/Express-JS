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

async function buyCrypto(cryptoId, userId) {
    const crypto = await Crypto.findById(cryptoId);
    crypto.buyCrypto.push(userId);
    await crypto.save();
}

async function deleteCrypto(id) {
    return await Crypto.findByIdAndDelete(id);
}

async function editCrypto(id, data) {
    
}

module.exports = {
    getAllCrypto,
    createCrypto,
    getCryptoById,
    buyCrypto,
    deleteCrypto
}