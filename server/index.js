const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser')

// IMport database connection
const db = require('./config/database');

//test connection
db.authenticate()
	.then( () => {console.log("Database Connected")})
	.error(error => console.log(error));
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

	//take the current page
	res.locals.currentPage = req.path;

	return next();
});

//Pass the sitename to the view
app.locals.sitetitle = config.sitename;

//Body parser
app.use(bodyParser.urlencoded({extended: true}))

//Listen For the homepage
app.use('/', routes());

//Run the application
app.listen(3000);