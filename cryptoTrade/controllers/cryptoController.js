const { hasUser } = require('../middlewares/guards');
const { createCrypto, getAllCrypto, getCryptoById, buyCrypto, deleteCrypto, editCrypto } = require('../services/cryptoService');
const { parseError } = require('../util/parser');



const cryptoController = require('express').Router();

cryptoController.get('/create', hasUser(), (req, res) => {
    	res.render('create', {
            title: 'Crypto Create',
            user: req.user
        })
});

cryptoController.post('/create', async (req, res) => {
    
    const crypto = {
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        price: Number(req.body.price),
        cryptoDescription: req.body.cryptoDescription,
        paymentMethod: req.body.paymentMethod,
        owner: req.user._id
    };

    try {
        await createCrypto(crypto);
        res.redirect('/catalog');
    } catch (error) {
        res.render('create', {
            title: 'Crypto Create',
            errors: parseError(error),
            body: crypto,
            user: req.user
        })
    }
});

cryptoController.get('/catalog', async (req, res) => {
    const cryptos = await getAllCrypto();
    res.render('catalog', {
        title: 'Crypto Catalog',
        user: req.user,
        cryptos
    })
});

cryptoController.get('/details/:id', async (req, res) => {
    const crypto = await getCryptoById(req.params.id);


    crypto.isOwner = crypto.owner.toString() == req.user?._id.toString();
    crypto.isBougth = crypto.buyCrypto.some((id) => id == req.user?._id);

    res.render('details', {
        title: crypto.title,
        user: req.user,
        crypto
    })
});

cryptoController.get('/details/:id/buy', hasUser(), async (req, res) => {
    await buyCrypto(req.params.id, req.user._id);
    res.redirect(`/details/${req.params.id}`);
});

cryptoController.get('/details/:id/delete', async (req, res) => {
    const crypto = await getCryptoById(req.params.id);

    if (crypto.owner.toString() != req.user._id.toString()) {
        return res.redirect('/auth/login');
    }

    await deleteCrypto(req.params.id);
    res.redirect('/catalog')
});

cryptoController.get('/details/:id/edit', async (req, res) => {
    const crypto = await getCryptoById(req.params.id);

    if (crypto.owner.toString() != req.user._id.toString()) {
        return res.redirect('/auth/login');
    }

    res.render('edit', {
        title: 'Edit Crypto',
        user: req.user,
        crypto
    })
});

cryptoController.post('/details/:id/edit', async (req, res) => {
    const crypto = await getCryptoById(req.params.id);

    try {
        await editCrypto(req.params.id, req.body);
        res.redirect(`/details/${req.params.id}`);
    } catch (error) {
        res.render('edit', {
            title: 'Edit book',
            user: req.user,
            errors: parseError(error),
            crypto: req.body
        })
    }
});

module.exports = cryptoController;