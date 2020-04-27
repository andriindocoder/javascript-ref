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

		// display appointments
		displayAppointments();
	}

	//Creating the schema, this method runs once
	AppointmentDB.onupgradeneeded = function(e) {
		let db = e.target.result;

		//Create an object store
		//keyPath = indexes of the database
		let objectStore = db.createObjectStore('appointments', { keyPath: 'key', autoIncrement: true });

		// createIndex 1)fieldname 2) keypath 3)options
		objectStore.createIndex('petname', 'petname', { unique:false });
		objectStore.createIndex('ownername', 'ownername', { unique:false });
		objectStore.createIndex('phone', 'phone', { unique:false });
		objectStore.createIndex('date', 'date', { unique:false });
		objectStore.createIndex('hour', 'hour', { unique:false });
		objectStore.createIndex('symptoms', 'symptoms', { unique:false });

	}

	form.addEventListener('submit', addAppointment);

	function addAppointment(e) {
		e.preventDefault();
		//Create new object
		let newAppointment = {
			petname : petName.value,
			ownername : ownerName.value,
			phone: phone.value,
			date: date.value,
			hour: hour.value,
			symptoms: symptoms.value
		}

		let transaction = DB.transaction(['appointments'], 'readwrite');
		let objectStore = transaction.objectStore('appointments');

		let request = objectStore.add(newAppointment);

		//on success
		request.onsuccess = () => {
			form.reset();
		}

		transaction.oncomplete = () => {
			console.log('Complete');
			displayAppointments();
		}

		transaction.onerror = () => {
			console.log('error');
		}
	}

	function displayAppointments() {
		// clear the previous appointments
		while(appointments.firstChild) {
			appointments.removeChild(appointments.firstChild);
		}

		// create the object store
		let objectStore = DB.transaction('appointments').objectStore('appointments');

		objectStore.openCursor().onsuccess = function(e) {
			let cursor = e.target.result;

			if(cursor) {
				let appointmentHTML = document.createElement('li');
				appointmentHTML.setAttribute('data-appointment-id', cursor.value.key);
				appointmentHTML.classList.add('list-group-item');

				appointmentHTML.innerHTML = `
					<p class="font-weight-bold">Pet Name: <span class="font-weight-normal">${cursor.value.petname}</span></p>
					<p class="font-weight-bold">Owner Name: <span class="font-weight-normal">${cursor.value.ownername}</span></p>
					<p class="font-weight-bold">Phone: <span class="font-weight-normal">${cursor.value.phone}</span></p>
					<p class="font-weight-bold">Date: <span class="font-weight-normal">${cursor.value.date}</span></p>
					<p class="font-weight-bold">Hour: <span class="font-weight-normal">${cursor.value.hour}</span></p>
					<p class="font-weight-bold">Symptoms: <span class="font-weight-normal">${cursor.value.symptoms}</span></p>
				`;

				// Add remove button
				const removeBTN = document.createElement('button');
				removeBTN.classList.add('btn', 'btn-danger');
				removeBTN.innerHTML = '<span aria-hidden="true">x</span> Remove';
				removeBTN.onclick = removeAppointment;

				// Add to HTML
				appointmentHTML.appendChild(removeBTN);
				appointments.appendChild(appointmentHTML);

				cursor.continue();
			} else {
				if(!appointments.firstChild) {
					appointmentTitle.textContent = 'Add a new appointment';
					let noAppointment = document.createElement('p');
					noAppointment.classList.add('text-center');
					noAppointment.textContent = 'No results found';
					appointments.appendChild(noAppointment);
				} else {
					appointmentTitle.textContent = 'Manage your Appointments';
				}
			}
		}
	}

	function removeAppointment(e) {
		let appointmentID = Number( e.target.parentElement.getAttribute('data-appointment-id') );
	}


});














