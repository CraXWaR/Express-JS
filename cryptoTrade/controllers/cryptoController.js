const { hasUser } = require('../middlewares/guards');
const { createCrypto, getAllCrypto } = require('../services/cryptoService');
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
        paymentMethod: req.body.paymentMethod
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

module.exports = cryptoController;