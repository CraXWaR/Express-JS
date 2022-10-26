const mongoose = require('mongoose');

const CONNECTION_STRING = 'mongodb://0.0.0.0:27017/jobList';

module.exports = async (app) => {
    try {
        await mongoose.connect(CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('Database connected');
        
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}