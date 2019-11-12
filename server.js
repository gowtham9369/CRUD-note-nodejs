const express = require('express');
const bodyParser = require('body-parser');
// create express app
const app = express();
// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
//logger
const logger = (req, res, next) => {
    console.log("logger");
    console.log(`Port is Running on ${req.protocol}://${req.get('host')}${req.originalUrl} `)
    next();
}
app.use(logger);

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Simple way of defining get method in server.js" });
});
// defining the router in ServiceWorkerRegistration.js 
require('./app/routes/note.route.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});