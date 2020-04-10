// Promises
const applyDiscount = new Promise(function(resolve, reject) {
	//Resolve when success
	//Reject when failed

	const discount = true;

	if(discount) {
		resolve('Discount Applied');
	} else {
		reject('Discount Failed');
	}

});

applyDiscount.then(function(result) {
	console.log(result);
}).catch(function(error){
	console.log(error);
})