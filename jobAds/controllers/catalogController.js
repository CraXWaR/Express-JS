const { hasUser } = require('../middlewares/guards');
const { getAllJobs, createJob, getJobById, deleteJob, editJob } = require('../services/addsService');
const { parseError } = require('../util/parser');



const adController = require('express').Router();


adController.get('/catalog', async (req, res) => {
    const adds = await getAllJobs();
    res.render('all-ads', {
        title: 'Catalog Page',
        user: req.user,
        adds
    })
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
        owner: req.user._id,
        ownerEmail: req.user.email
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

adController.get('/details/:id', async (req, res) => {
    const job = await getJobById(req.params.id);

    if (req.user._id) {
        job.isOwner = job.owner.toString() == req.user._id.toString();
        job.isApplied = job.appliedJob.some((id) => id == req.user._id);
    }

    res.render('details', {
        title: 'Job title',
        user: req.user,
        job
    })
});

adController.get('/details/:id/delete', async (req, res) => {
    const job = await getJobById(req.params.id);

    if (job.owner.toString() != req.user._id.toString()) {
        return res.redirect('/auth/login');
    };

    await deleteJob(req.params.id);
    res.redirect('/catalog');

});

adController.get('/details/:id/edit', async (req, res) => {
    const job = await getJobById(req.params.id);

    if (job.owner.toString() != req.user._id.toString()) {
        return res.redirect('/auth/login');
    };

    res.render('edit', {
        title: 'Edit Job',
        user: req.user,
        job
    });
});

adController.post('/details/:id/edit', async (req, res) => {
    const job = await getJobById(req.params.id);

    try {
        await editJob(req.params.id, req.body);
        res.redirect(`/details/${req.params.id}`);
    } catch (error) {
        res.render('edit', {
            title: 'Edit Job',
            user: req.user,
            errors: parseError(error),
            job: req.body
        })
    }
});

module.exports = adController;