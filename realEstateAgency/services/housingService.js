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

async function editHouse(id, data) {
    const existingHouse = await Houseing.findById(id);

    existingHouse.name = data.name;
    existingHouse.type = data.type;
    existingHouse.year = data.year;
    existingHouse.city = data.city;
    existingHouse.homeImg = data.homeImg;
    existingHouse.description = data.description;
    existingHouse.availablePieces = data.availablePieces;

   return existingHouse.save();
}

async function rentHouse(houseId, userId) {
    const house = await Houseing.findById(houseId);
    house.rentHome.push(userId);
    house.availablePieces -= 1;
    await house.save();
}

module.exports = {
    getAllHouses,
    createHouse,
    getHouseById,
    deleteHouse,
    editHouse,
    rentHouse
}