const express = require('express');
const routes = require('./routes');

//Create the new server
const app = express();

//Listen For the homepage
app.use('/', routes());

//Run the application
app.listen(3000);