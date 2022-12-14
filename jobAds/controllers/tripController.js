const { hasUser } = require('../middlewares/guards');
const { getAllTrips, createTrip, getTripById, deleteTrip, editTrip, joinTrip } = require('../services/tripService');
const { parseError } = require('../util/parser');


const tripController = require('express').Router();

tripController.get('/catalog', async (req, res) => {
    const trips = await getAllTrips();
    res.render('shared-trips', {
        title: 'Catalog Trips',
        user: req.user,
        trips
    })
});

tripController.get('/create', hasUser(), (req, res) => {
    res.render('trip-create', {
        title: 'Trip Create',
        user: req.user
    });
});

tripController.post('/create', async (req, res) => {
    const trip = {
        startPoint: req.body.startPoint,
        endPoint: req.body.endPoint,
        date: req.body.date,
        time: req.body.time,
        carImage: req.body.carImage,
        carBrand: req.body.carBrand,
        seats: Number(req.body.seats),
        price: Number(req.body.price),
        description: req.body.description,
        owner: req.user._id,
        ownerEmail: req.user.email
    };

    try {
        await createTrip(trip);
        res.redirect('/catalog')
    } catch (error) {
        res.render('trip-create', {
            title: 'Trip Create',
            errors: parseError(error),
            body: trip,
            user: req.user
        })
    };
});

tripController.get('/details/:id', async (req, res) => {
    const trip = await getTripById(req.params.id);
    console.log(trip);
    trip.isOwner = trip.owner.toString() == req.user?._id.toString();
    trip.isJoined = trip.buddies.some((id) => id == req.user?._id);

    trip.availableSeats = trip.seats

    res.render('trip-details', {
        title: 'Trip Title',
        user: req.user,
        trip
    });
    
});

tripController.get('/details/:id/delete', hasUser(), async (req, res) => {
    await deleteTrip(req.params.id);
    res.redirect('/catalog');
});

tripController.get('/details/:id/edit', async (req, res) => {
    const trip = await getTripById(req.params.id);

    if (trip.owner.toString() != req.user._id.toString()) {
        return res.redirect('/auth/login');
    };

    res.render('trip-edit', {
        title: 'Edit Trip',
        user: req.user,
        trip
    });
});

tripController.post('/details/:id/edit', async (req, res) => {
    const trip = await getTripById(req.params.id);

    try {
        await editTrip(req.params.id, req.body);
        res.redirect(`/details/${req.params.id}`)
    } catch (error) {
        res.render('trip-edit', {
            title: 'Edit Trip',
            user: req.user,
            trip,
            errors: parseError(error)
        });
    }
});

tripController.get('/details/:id/join', hasUser(), async (req, res) => {
    await joinTrip(req.params.id, req.user._id);
    res.redirect(`/details/${req.params.id}`);

})

module.exports = tripController;