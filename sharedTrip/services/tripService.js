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

async function editTrip(id, data) {
    const existingTrip = await Trip.findById(id);

    existingTrip.startPoint = data.startPoint;
    existingTrip.endPoint = data.endPoint;
    existingTrip.date = data.date;
    existingTrip.time = data.time;
    existingTrip.carImage = data.carImage;
    existingTrip.carBrand = data.carBrand;
    existingTrip.seats = data.seats;
    existingTrip.price = data.price;
    existingTrip.description = data.description;

    return existingTrip.save()
}

async function joinTrip(tripId, userId) {
    const trip = await Trip.findById(tripId);
    trip.buddies.push(userId);
    await trip.save();
}

module.exports = {
    getAllTrips,
    createTrip,
    getTripById,
    deleteTrip,
    editTrip,
    joinTrip
}