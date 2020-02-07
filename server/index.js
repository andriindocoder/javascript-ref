const express = require('express');


//Create the new server
const app = express();

//Listen For the homepage
app.use('/', (req, res) => {
	res.send('Hello World');
});

//Run the application
app.listen(3000);