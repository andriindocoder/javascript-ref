//Variables
const courses = document.querySelector('#courses-list'),
	shoppingCartContent = document.querySelector('#cart-content tbody'),
	clearCartBtn = document.querySelector('#clear-cart');

//Listeners
loadEventListeners();

function loadEventListeners() {
	// When a new course is added
	courses.addEventListener('click', buyCourse);

	// When the remove button is clicked
	shoppingCartContent.addEventListener('click', removeCourse);

	//Clear Cart Button
	clearCartBtn.addEventListener('click', clearCart);

	//Document Ready
	document.addEventListener('DOMContentLoaded', getFromLocalStorage);
}


//Functions
function buyCourse(e) {
	e.preventDefault();

	if(e.target.classList.contains('add-to-cart')) {
		//Read the course values
		const course = e.target.parentElement.parentElement;

		//Read the values
		getCourseInfo(course);
	}
}

//Read the html information of the selected course
function getCourseInfo(course) {
	// Create an object with COurse data
	const courseInfo = {
		image: course.querySelector('img').src,
		title: course.querySelector('h4').textContent,
		price: course.querySelector('.price span').textContent,
		id: course.querySelector('a').getAttribute('data-id')
	}
	// Insert into the shopping cart
	addIntoCart(courseInfo);
}

//Display the selected course into shopping cart
function addIntoCart(course) {
	//Create a tr
	const row = document.createElement('tr');

	//Build the template
	row.innerHTML = `
		<tr>
			<td>
				<image src="${course.image}" width=100>
			</td>
			<td>${course.title}</td>
			<td>${course.price}</td>
			<td>
				<a href="#" class="remove" data-id="${course.id}">X</a>
			</td>
		</tr>
	`;
	//Add into shopping cart
	shoppingCartContent.appendChild(row);

	//Add into local storage
	saveIntoStorage(course);
}

// Add the course to local storage
function saveIntoStorage(course) {
	let courses = getCoursesFromStorage();
	courses.push(course);
	//Convert json to string
	localStorage.setItem('courses', JSON.stringify(courses));
}

// Get the courses from storage
function getCoursesFromStorage() {
	let courses;
	if(localStorage.getItem('courses') === null) {
		courses = [];
	} else {
		courses = JSON.parse(localStorage.getItem('courses'));
	}

	return courses;
}

// Remove course from the DOM
function removeCourse(e) {
	if(e.target.classList.contains('remove')) {
		e.target.parentElement.parentElement.remove();
	}
}

// Clear Cart
function clearCart() {
	// shoppingCartContent.innerHTML = '';

	while(shoppingCartContent.firstChild) {
		shoppingCartContent.removeChild(shoppingCartContent.firstChild);
	}

	//Clear from Local Storage
	clearLocalStorage();
}

//Load shopping cart when document ready
function getFromLocalStorage() {
	let coursesLS = getCoursesFromStorage();

	//Loop through
	coursesLS.forEach(function(course) {
		//create the tr
		const row = document.createElement('tr');

		// Print
		row.innerHTML = `
		<tr>
			<td>
				<image src="${course.image}" width=100>
			</td>
			<td>${course.title}</td>
			<td>${course.price}</td>
			<td>
				<a href="#" class="remove" data-id="${course.id}">X</a>
			</td>
		</tr>
	`;
	shoppingCartContent.appendChild(row);
	});
}
