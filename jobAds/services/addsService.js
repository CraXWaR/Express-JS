const Ad = require('../models/Ad');

async function getAllJobs() {
    return await Ad.find({}).lean(); 
}

async function createJob(job) {
    return Ad.create(job);
}

module.exports = {
    getAllJobs,
    createJob,

}