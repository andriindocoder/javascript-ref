let DB;

const form = document.querySelector('form'),
		petName = document.querySelector('#pet-name'),
		ownerName = document.querySelector('#owner-name'),
		phone = document.querySelector('#phone'),
		date = document.querySelector('#date'),
		hour = document.querySelector('#hour'),
		symptoms = document.querySelector('#symptoms'),
		appointments = document.querySelector('#appointments'),
		appointmentTitle = document.querySelector('#appointment-title');

document.addEventListener('DOMContentLoaded', () => {
	//create the database
	let AppointmentDB = window.indexedDB.open('appointments', 1);

	// If there's an error
	AppointmentDB.onerror = function() {
		console.log('There is an error');
	}
	// If success, assign the result
	AppointmentDB.onsuccess = function() {
		console.log('Database Ready');

		DB = AppointmentDB.result;
	}

	//Creating the schema, this method runs once
	AppointmentDB.onupgradeneeded = function(e) {
		let db = e.target.result;

		//Create an object store
		//keyPath = indexes of the database
		let objectStore = db.createObjectStore('appointments', { keyPath: 'key', autoIncrement: true });

	}

});