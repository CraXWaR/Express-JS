const express = require('express');
const expressConfig = require('./config/express');
const databaseConfig = require('./config/database');
const routesConfig = require('./config/routes');
const cors = require('cors');

let corsOptions = {
    origin: 'http://localhost:4200'
};

start();

async function start() {
    const app = express();

    expressConfig(app);
    await databaseConfig(app);
    routesConfig(app);
    app.use(cors(corsOptions));
    app.listen(3000, () => console.log('Server is working'));
    //.. config
}