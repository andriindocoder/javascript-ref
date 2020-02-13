const express = require('express');
const routes = require('./routes');
const path = require('path');

//Create the new server
const app = express();

//enable Pug
app.set('view engine', 'pug');

// add the views folder to project
app.set('views', path.join(__dirname, './views'))

// load the public asset folder
app.use(express.static('public'));

//Listen For the homepage
app.use('/', routes());

//Run the application
app.listen(3000);