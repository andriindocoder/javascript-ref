document.getElementById('button').addEventListener('click', loadData);

function loadData() {
	//Create new xML HTttp Request
	const xhr = new XMLHttpRequest();

	// Open the connection
	xhr.open('GET', 'data.txt', true);

	// Ajax call execution
	// xhr.onload = function() {
	// 	if(this.status === 200) {
	// 		document.getElementById('output').innerHTML = `<h1>${this.responseText}</h1>`;
	// 	}
	// }
	xhr.onreadystatechange = function() {
		/*
			readyState 0 = Unsent; 1 = Opened; 2 = Received; 3 = Loading; 4 = Done;
		*/
		if(this.status === 200 && this.readyState === 4) {
			document.getElementById('output').innerHTML = `<h1>${this.responseText}</h1>`;
		}
	}

	//SEnd the request
	xhr.send();
}