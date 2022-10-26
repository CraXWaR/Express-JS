const Ad = require('../models/Ad');

async function getAllJobs() {
    return await Ad.find({}).lean(); 
}

async function createJob(job) {
    return Ad.create(job);
}

async function getJobById(id) {
    return await Ad.findById(id).lean();
}

async function deleteJob(id) {
    return await Ad.findByIdAndRemove(id);
}

async function editJob(id, data) {
    const exinstingJob = await Ad.findById(id);

    exinstingJob.headline = data.headline;
    exinstingJob.location = data.location;
    exinstingJob.companyName = data.companyName;
    exinstingJob.companyDescription = data.companyDescription;

    return exinstingJob.save();
}

module.exports = {
    getAllJobs,
    createJob,
    getJobById,
    deleteJob,
    editJob,
    
}