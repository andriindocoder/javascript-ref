document.getElementById('button1').addEventListener('click', loadEmployee);

function loadEmployee() {
	//Create the object
	const xhr = new XMLHttpRequest();

	//Open Connection
	xhr.open('GET', 'employee.json', true);

	//Execute
	xhr.onload = function() {
		if(this.status === 200) {
			const employee = JSON.parse(this.responseText);
			const output = `
				<ul>
					<li>ID: ${employee.id}</li>
					<li>Name: ${employee.name}</li>
					<li>Company: ${employee.company}</li>
					<li>Job: ${employee.job}</li>
				</ul>
			`;
			document.getElementById('employee').innerHTML = output;
		}
	}

	xhr.send();
}