const { hasUser } = require('../middlewares/guards');
const { getAllJobs, createJob } = require('../services/addsService');
const { parseError } = require('../util/parser');



const adController = require('express').Router();


adController.get('/catalog', async (req, res) => {
    const adds = await getAllJobs();
    res.render('all-ads', {
        title: 'Catalog Page',
        user: req.user,
        adds
    })
    console.log(adds);
});

adController.get('/create', hasUser(), (req, res) => {
    res.render('create', {
        title: 'Job Create',
        user: req.user
    })
});

adController.post('/create', async (req, res) => {
    const job = {
        headline: req.body.headline,
        location: req.body.location,
        companyName: req.body.companyName,
        companyDescription: req.body.companyDescription,
        owner: req.user._id
    };

    try {
        await createJob(job);
        res.redirect('/catalog')
    } catch (error) {
        res.render('create', {
            title: 'Job Create',
            errors: parseError(error),
            body: job,
            user: req.user
        })
    }
});

module.exports = adController;