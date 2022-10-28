const Houseing = require('../models/Housing');

async function getAllHouses() {
    return await Houseing.find({}).lean();
}

function createHouse(house) {
    return Houseing.create(house)
}

async function getHouseById(id) {
    return await Houseing.findById(id).lean();
}

async function deleteHouse(id) {
    return await Houseing.findByIdAndRemove(id);
}

module.exports = {
    getAllHouses,
    createHouse,
    getHouseById,
    deleteHouse
}