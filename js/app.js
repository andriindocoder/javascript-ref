document.getElementById('button1').addEventListener('click', loadTxt);

function loadTxt() {
	fetch('data.txt')
	.then(function(response){
		return response.text()
	})
	.then(function(data){
		console.log(data);
		document.getElementById('result').innerHTML = data;
	})
	.catch(function(error){
		console.log(error);
	})
}