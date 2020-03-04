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
		console.log(url);
	} 
}