document
  .querySelector("#generate-names")
  .addEventListener("submit", generateNames);

function generateNames(e) {
  e.preventDefault();

  //Constant
  const country = document.querySelector("#country").value;
  const gender = document.querySelector("#gender").value;
  const amount = document.querySelector("#quantity").value;

  let url = "https://uinames.com/api/?";

  if (country !== "") {
    url += `region=${country}&`;
  }
  if (gender !== "") {
    url += `gender=${gender}&`;
  }
  if (country !== "") {
    url += `amount=${amount}&`;
  }

  const xhr = new XMLHttpRequest();

  //Open XHR Connection
  xhr.open('GET', url, true);

  xhr.onload = function() {
	  if(this.status === 200){
		  const names = JSON.parse(this.responseText);
		  console.log(names);
	  }
  }

  xhr.send();

  console.log(url);
}
