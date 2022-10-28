const { hasUser } = require('../middlewares/guards');
const { getAllHouses, createHouse, getHouseById, deleteHouse, editHouse } = require('../services/housingService');
const { parseError } = require('../util/parser');


const houseingController = require('express').Router();

houseingController.get('/catalog', async (req, res) => {
    const houses = await getAllHouses();

    res.render('aprt-for-recent', {
        title: 'Catalog Page',
        user: req.user,
        houses
    })
});

houseingController.get('/create', hasUser(), async (req, res) => {
    res.render('create', {
        title: 'Create House',
        user: req.user
    });
});

houseingController.post('/create', async (req, res) => {
    const house = {
        name: req.body.name,
        type: req.body.type,
        year: Number(req.body.year),
        city: req.body.city,
        homeImg: req.body.homeImg,
        description: req.body.description,
        availablePieces: Number(req.body.availablePieces),
        owner: req.user._id
    };

    try {
        await createHouse(house);
        res.redirect('/catalog');
    } catch (error) {
        res.render('create', {
            title: 'Create House',
            user: req.user,
            errors: parseError(error)
        });
    }
});

houseingController.get('/details/:id', async (req, res) => {
    const house = await getHouseById(req.params.id);

    house.isOwner = house.owner.toString() == req.user?._id.toString();
    house.isRent = house.rentHome.some((id) => id == req.user?._id);

    res.render('details', {
        title: house.name,
        user: req.user,
        house
    });
});

houseingController.get('/details/:id/delete', async (req, res) => {
    const house = await getHouseById(req.params.id);

    if(house.owner.toString() != req.user._id.toString()) {
        return res.redirect('/auth/login');
    };

    await deleteHouse(req.params.id);
    res.redirect('/catalog')
});

houseingController.get('/details/:id/edit', async (req, res) => {
    const house = await getHouseById(req.params.id);

    if(house.owner.toString() != req.user._id.toString()) {
        return res.redirect('/auth/login');
    };

    res.render('edit', {
        title: 'Edit Houseing',
        user: req.user,
        house
    });
});

houseingController.post('/details/:id/edit', async (req, res) => {
    const house = await getHouseById(req.params.id);

    try {
        await editHouse(req.params.id, req.body);
        res.redirect(`/details/${req.params.id}`);
    } catch (error) {
        res.render('edit', {
            title: 'Edit Houseing',
            user: req.user,
            house,
            errors: parseError(error)
        });
    }
});

module.exports = houseingController;