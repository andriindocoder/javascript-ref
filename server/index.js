const express = require('express');
const routes = require('./routes');
const path = require('path');

//Import the configuration
const configs = require('./config');

//Create the new server
const app = express();

const config = configs[app.get('env')];


//enable Pug
app.set('view engine', 'pug');

// add the views folder to project
app.set('views', path.join(__dirname, './views'))

// load the public asset folder
app.use(express.static('public'));

// get the current year
app.use((req, res, next) => {
	const date = new Date();
	res.locals.currentYear = date.getFullYear();
	return next();
});

//Pass the sitename to the view
app.locals.sitetitle = config.sitename;

//Listen For the homepage
app.use('/', routes());

//Run the application
app.listen(3000);