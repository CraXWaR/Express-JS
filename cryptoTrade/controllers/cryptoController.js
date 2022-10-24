const { hasUser } = require('../middlewares/guards');
const { createCrypto, getAllCrypto, getCryptoById } = require('../services/cryptoService');
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

    if (req.user._id) {
        crypto.isOwner = crypto.owner.toString() == req.user._id.toString();
        crypto.isBougth = crypto.buyCrypto.some((id) => id == req.user._id);
    }

    res.render('details', {
        title: crypto.title,
        user: req.user,
        crypto
    })
    console.log(crypto.isOwner);
});

module.exports = cryptoController;