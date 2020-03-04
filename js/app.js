document.querySelector('#generate-names').addEventListener('submit', loadNames);

//Function to query API
function loadNames(e) {
	e.preventDefault();

	const origin = document.getElementById('country').value;
	const genre = document.getElementById('genre').value;
	const amount = document.getElementById('quantity').value;

	//Build the url
	let url = 'https://uinames.com/api/?';

	if(origin !=0) {
		url += `region=${origin}&`;
	} 

	if(genre !=0) {
		url += `gender=${genre}&`;
	} 

	if(amount !=0) {
		url += `amount=${amount}&`;
	} 

	//Ajax Request
	const xhr = new XMLHttpRequest();

	//Open Connection
	xhr.open('GET', url, true);

	//Execute function
	xhr.onload = function() {
		if(this.status === 200) {
			const names = JSON.parse(this.responseText);

			//Insert to HTML
			let html = '<h2>Generated Names</h2>';
			html += '<ul class="list">';
			names.forEach(function(name) {
				html += `
					<li>${name.name}</li>
				`;
			});

			html += '</ul>';

			document.querySelector('#result').innerHTML = html;
		}
	}

	xhr.send();
}