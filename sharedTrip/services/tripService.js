const Trip = require('../models/Trip');

async function getAllTrips() {
    return await Trip.find({}).lean();
}

function createTrip(trip) {
    return Trip.create(trip);
}

async function getTripById(id) {
    return await Trip.findById(id).lean();
}

async function deleteTrip(id) {
    return await Trip.findByIdAndRemove(id);
}

module.exports = {
    getAllTrips,
    createTrip,
    getTripById,
    deleteTrip
}