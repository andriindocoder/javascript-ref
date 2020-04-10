const cities = ['London', 'New York', 'Paris', 'Madrid', 'Berlin'];

//Inline callbacks
cities.forEach(function(city) {
	console.log(city);
});

//Callback with function declaration
function callback(city) {
	console.log(city);
}
cities.forEach(callback);

const countries = ['France', 'Spain', 'Portugal', 'Australia', 'US'];

function newCountry(country, callback) {
	setTimeout(function() {
		countries.push(country);
		//Execute the callback
		callback();
	}, 2000);
}

//Display the countries after 1 second
function displayCountries() {
	setTimeout(function() {
		let html = '';
		countries.forEach(function(country) {
			html += `<li>${country}</li>`
		});
		document.body.innerHTML = html;
	}, 1000);
}

newCountry('Germany', displayCountries);

displayCountries();