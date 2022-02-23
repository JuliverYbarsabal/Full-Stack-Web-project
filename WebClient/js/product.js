/**
	switching through different tables using 'block' & 'active'
**/
function openFile(evt, content) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(content).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

/**
	END switching through different tables using 'block' & 'active'
**/
/**
	Search method going through each row in a table
**/
$('#search-input').on('keyup', function(){
	var value = $(this).val()
	var data = searchTable(value, myArray)
	var data_1 = searchTable(value, myArray_1)
	var data_2 = searchTable(value, myArray_2)
	var data_3 = searchTable(value, myArray_3)
	var data_4 = searchTable(value, myArray_4)
	var data_5 = searchTable(value, myArray_5)
	var data_6 = searchTable(value, myArray_6)
	buildTable(data)
	buildTable_1(data_1)
	buildTable_2(data_2)
	buildTable_3(data_3)
	buildTable_4(data_4)
	buildTable_5(data_5)
	buildTable_6(data_6)
	displayUserBtns()
})


function searchTable(value, data){
	var fildata = []
			
	for(var i = 0; i < data.length; i++){
		value = value.toLowerCase()
		var name = data[i].Name.toLowerCase()
	
		if(name.includes(value)){
			fildata.push(data[i])
		}
	}
	
	return fildata
}
/**
 	END OF SEARCH METHOD
**/
/** 
	retrieve data from json file	
**/
var myArray = []

const ranKingsBody = document.querySelector(".myTable");

function loadRankings (){
	const request = new XMLHttpRequest();

	request.open("get", "http://ceto.murdoch.edu.au/~33303336/assignment2/Server/GetProducts.php");
	request.onload = () => {
		try{
			const json = JSON.parse(request.responseText);
			populateRankings(json);
		} catch (e) {
		console.warn("Error loading table");
		}
	};
	request.send();
}

function populateRankings (json){
	myArray = json
	buildTable(myArray)
}

document.addEventListener("DOMContentLoaded", () => { loadRankings(); });

function buildTable(data){
	var table = document.getElementById('myTable')
	table.innerHTML = ""
	
	//Validation for table searches
	if(data.length == 0){
		var line="Please try again. Product search not found within 'All table'";
		var output=line.fontcolor('red');
		document.getElementById("Invalid").innerHTML = output;
	}
	else{
		document.getElementById("Invalid").innerHTML = "";
	}

	for (var i = 0; i < data.length; i++){
		var row = `<tr>
					<td>${data[i].Name}</td>
					<td>${data[i].CategoryName}</td>
					<td>${data[i].Description}</td>
					<td><c>$</c>${data[i].Price}</td>
					<td>${data[i].Qty}</td>
					<td><button class="button addCartBtn add-cart" onClick="alert('Item has been added into your cart!')" >Add Cart</button><button class="button editProductBtn" onClick="editProduct(${data[i].PkID})" >Edit Product</button></td>
		</tr>`
		table.innerHTML += row
	}

	// add to cart
	let carts = document.querySelectorAll('.add-cart');

	for(let i=0; i < carts.length; i++){
		carts[i].addEventListener('click', () => {
			cartNumbers(data[i]);
			totalCost(data[i]);
		})
	}

	function onLoadCartNumbers(){
		let productNumbers = localStorage.getItem('cartNumbers');
		if(productNumbers){
			document.querySelector('.cart span').textContent = productNumbers;
		}
	}

	function cartNumbers(myArray, action) {
		let productNumbers = localStorage.getItem('cartNumbers');
		productNumbers = parseFloat(productNumbers);

		let cartItems = localStorage.getItem('productsInCart');
		cartItems = JSON.parse(cartItems);
		
		if (action == "decrease") {
			localStorage.setItem('cartNumbers', productNumbers -1);
			document.querySelector('.cart span').textContent = productNumbers - 1;
		} else if( productNumbers ) {
			localStorage.setItem("cartNumbers", productNumbers + 1);
			document.querySelector('.cart span').textContent = productNumbers + 1;
		} else {
			localStorage.setItem("cartNumbers", 1);
			document.querySelector('.cart span').textContent = 1;
		}
					
		setItems(myArray);

	}
		
	function setItems(myArray){
		let cartItems = localStorage.getItem('productsInCart');
		cartItems = JSON.parse(cartItems);
		if(cartItems != null){
			myArray.inCart = parseFloat(myArray.inCart);
			if(cartItems[myArray.Name] == undefined) {
				cartItems = {
					...cartItems,
					[myArray.Name]: myArray					
				}
			}
			cartItems[myArray.Name].inCart += 1;
		}else{
			myArray.inCart = 1;
			cartItems = {
				[myArray.Name]: myArray
			}
		}
		localStorage.setItem("productsInCart", JSON.stringify(cartItems));
	}

	function totalCost(myArray, action){
		let cartCost = localStorage.getItem('totalCost');
		cartCost = Number(cartCost);

		if( action == "decrease"){
			cartCost = parseFloat(cartCost);
			localStorage.setItem('totalCost', cartCost - myArray.Price);
		} else if(cartCost != null){
			myArray.Price = parseFloat(myArray.Price);
			localStorage.setItem("totalCost", cartCost + myArray.Price);
		} else {
			localStorage.setItem("totalCost", myArray.Price);
		}
	}

	function displayCart(){
		$("#cartMSG").html("");
		let cartItems = localStorage.getItem("productsInCart");
		cartItems = JSON.parse(cartItems);
		let CartContainer = document.getElementById('cart-products')
		let cartCost = localStorage.getItem('totalCost');

		if(cartItems && CartContainer){
			CartContainer.innerHTML = '';
			Object.values(cartItems).map(item => {
			var row = ` <tr>
					<td class="product">${item.Name}<button class="btn-danger" type="button"> REMOVE</button></td>
					<td>${item.CategoryName}</td>
					<td>${item.Description}</td>
					<td class="total">$${(item.inCart * item.Price).toFixed(2)}</td>	
					<td>${item.Qty}</td>
					<td class="qty"><button class="decrease" type="button">DEC--</button><span id="qty">${item.inCart} </span><button class="increase" type="button">--INC</button></td>	
				</tr>`		
			CartContainer.innerHTML += row
			});
			
			CartContainer.innerHTML += `
			<div class="basketTotalContainer">
				<h4 class="basketTotalTitle">
					Basket Total
				</h4>
				<h4 class="basketTotal">
					$${cartCost}
				</h4>
			`;
		}
		deleteButtons();
		manageQuantity();
	}

	//Remove table
	function deleteButtons() {
		let deleteButtons = document.querySelectorAll('.btn-danger'); 
		let productName;
		let productNumbers = localStorage.getItem('cartNumbers');
		let cartItems = localStorage.getItem('productsInCart');
		cartItems = JSON.parse(cartItems);
		let cartCost = localStorage.getItem('totalCost');
		for(let i=0; i < deleteButtons.length; i++) {
			deleteButtons[i].addEventListener('click', () => {
				productName = deleteButtons[i].parentElement.textContent.replace('REMOVE','').trim();

				localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart );

				localStorage.setItem('totalCost', cartCost - (cartItems[productName].Price * cartItems[productName].inCart));
	
				delete cartItems[productName];
				localStorage.setItem('productsInCart', JSON.stringify(cartItems));

				displayCart();
				onLoadCartNumbers();

			});
		}
	}
	//increase & decrease
	function manageQuantity() {
		let decreaseButtons = document.querySelectorAll('.decrease');
		let increaseButtons = document.querySelectorAll('.increase');
		let cartItems = localStorage.getItem("productsInCart");
		let currentQuatity = 0;
		let currentProduct = "";
		cartItems = JSON.parse(cartItems);
		for(let i=0; i < decreaseButtons.length; i++) {
			decreaseButtons[i].addEventListener('click', () => {
				currentQuatity = decreaseButtons[i].parentElement.querySelector('span').textContent;
				currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent.replace('REMOVE','').trim();						

				if(cartItems[currentProduct].inCart > 1 ){
				cartItems[currentProduct].inCart -= 1;
				cartNumbers(cartItems[currentProduct], "decrease" );
				totalCost(cartItems[currentProduct], "decrease" );
				localStorage.setItem('productsInCart', JSON.stringify(cartItems));
				displayCart();
				}
			});
		}
		
		for(let i=0; i < increaseButtons.length; i++) {
			increaseButtons[i].addEventListener('click', () => {
				currentQuatity = increaseButtons[i].parentElement.querySelector('span').textContent;
				currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent.replace('REMOVE','').trim();						

				cartItems[currentProduct].inCart += 1;
				cartNumbers(cartItems[currentProduct]);
				totalCost(cartItems[currentProduct]);
				localStorage.setItem('productsInCart', JSON.stringify(cartItems));
				displayCart();
			})
		}
	}
	onLoadCartNumbers();
	displayCart();
}

/** 
	END retrieve data from json file	
**/


/**
	Accessories Table
**/
var myArray_1 = []
const ranKingsBody_1 = document.querySelector("#myTable_1");

function loadRankings_1 (){
const request = new XMLHttpRequest();
	request.open("get", "http://ceto.murdoch.edu.au/~33303336/assignment2/Server/GetProductsByCategory.php?Category=1");
	request.onload = () => {
		try{
			const json = JSON.parse(request.responseText);
			populateRankings_1(json);
		} catch (e) {
		}
	};
	request.send();
}

function populateRankings_1 (json){
	myArray_1 = json;
	buildTable_1(myArray_1)	;
}

document.addEventListener("DOMContentLoaded", () => { loadRankings_1(); });

function buildTable_1(data){
	var table = document.getElementById('myTable_1')
	table.innerHTML = ""

	//Validation for table searches
		if(data.length == 0){
		var line="please try again... Product search not found within ' Accessories table '";
		var output=line.fontcolor('red');
		document.getElementById("Invalid_1").innerHTML = output;
	}
	else{
		document.getElementById("Invalid_1").innerHTML = "";
	}

	for (var i = 0; i < data.length; i++){
		var row = `<tr>
					<td>${data[i].Name}</td>
					<td>${data[i].CategoryName}</td>
					<td>${data[i].Description}</td>
					<td>$${data[i].Price}</td>
					<td>${data[i].Qty}</td>
					<td><button class="button addCartBtn add-cart1" onClick="alert('Item has been added into your cart!')" >Add Cart</button><button class="button editProductBtn" onClick="editProduct(${data[i].PkID})" >Edit Product</button></td>
		</tr>`
		table.innerHTML += row
	}

	// add to cart
	let carts = document.querySelectorAll('.add-cart1');

	for(let i=0; i < carts.length; i++){
		carts[i].addEventListener('click', () => {
			cartNumbers(data[i]);
			totalCost(data[i]);
		})
	}

	function onLoadCartNumbers(){
		let productNumbers = localStorage.getItem('cartNumbers');
		if(productNumbers){
			document.querySelector('.cart span').textContent = productNumbers;
		}
	}

	function cartNumbers(myArray_1, action) {
		let productNumbers = localStorage.getItem('cartNumbers');
		productNumbers = parseFloat(productNumbers);

		let cartItems = localStorage.getItem('productsInCart');
		cartItems = JSON.parse(cartItems);
		
		if (action == "decrease") {
			localStorage.setItem('cartNumbers', productNumbers -1);
			document.querySelector('.cart span').textContent = productNumbers - 1;
		} else if( productNumbers ) {
			localStorage.setItem("cartNumbers", productNumbers + 1);
			document.querySelector('.cart span').textContent = productNumbers + 1;
		} else {
			localStorage.setItem("cartNumbers", 1);
			document.querySelector('.cart span').textContent = 1;
		}				
		setItems(myArray_1);
	}
		
	function setItems(myArray_1){
		let cartItems = localStorage.getItem('productsInCart');
		cartItems = JSON.parse(cartItems);
		if(cartItems != null){
			myArray_1.inCart = parseFloat(myArray_1.inCart);
			if(cartItems[myArray_1.Name] == undefined) {
				cartItems = {
					...cartItems,
					[myArray_1.Name]: myArray_1					
				}
			}
			cartItems[myArray_1.Name].inCart += 1;
		}else{
			myArray_1.inCart = 1;
			cartItems = {
				[myArray_1.Name]: myArray_1
			}
		}
		localStorage.setItem("productsInCart", JSON.stringify(cartItems));
	}

	function totalCost(myArray_1, action){
		let cartCost = localStorage.getItem('totalCost');
		cartCost = Number(cartCost);

		if( action == "decrease"){
			cartCost = parseFloat(cartCost);
			localStorage.setItem('totalCost', cartCost - myArray_1.Price);
		} else if(cartCost != null){
			myArray_1.Price = parseFloat(myArray_1.Price);
			localStorage.setItem("totalCost", cartCost + myArray_1.Price);
		} else {
			localStorage.setItem("totalCost", myArray_1.Price);
		}
	}

	function displayCart(){
		$("#cartMSG").html("");
		let cartItems = localStorage.getItem("productsInCart");
		cartItems = JSON.parse(cartItems);
		let CartContainer = document.getElementById('cart-products')
		let cartCost = localStorage.getItem('totalCost');

		if(cartItems && CartContainer){
			CartContainer.innerHTML = '';
			Object.values(cartItems).map(item => {
			var row = ` <tr>
					<td class="product">${item.Name}<button class="btn-danger" type="button"> REMOVE</button></td>
					<td>${item.CategoryName}</td>
					<td>${item.Description}</td>
					<td class="total">$${(item.inCart * item.Price).toFixed(2)}</td>	
					<td>${item.Qty}</td>
					<td class="qty"><button class="decrease" type="button">DEC--</button><span id="qty">${item.inCart} </span><button class="increase" type="button">--INC</button></td>	
				</tr>`		
			CartContainer.innerHTML += row
			});
			
			CartContainer.innerHTML += `
			<div class="basketTotalContainer">
				<h4 class="basketTotalTitle">
					Basket Total
				</h4>
				<h4 class="basketTotal">
					$${cartCost}
				</h4>
			`;
		}
		deleteButtons();
		manageQuantity();
	}

	//Remove table
	function deleteButtons() {
		let deleteButtons = document.querySelectorAll('.btn-danger'); 
		let productName;
		let productNumbers = localStorage.getItem('cartNumbers');
		let cartItems = localStorage.getItem('productsInCart');
		cartItems = JSON.parse(cartItems);
		let cartCost = localStorage.getItem('totalCost');
		

		for(let i=0; i < deleteButtons.length; i++) {
			deleteButtons[i].addEventListener('click', () => {
				productName = deleteButtons[i].parentElement.textContent.replace('REMOVE','').trim();
				localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart );
				localStorage.setItem('totalCost', cartCost - (cartItems[productName].Price * cartItems[productName].inCart));
				delete cartItems[productName];
				localStorage.setItem('productsInCart', JSON.stringify(cartItems));

				displayCart();
				onLoadCartNumbers();

			});
		}
	}
	//increase & decrease
	function manageQuantity() {
		let decreaseButtons = document.querySelectorAll('.decrease');
		let increaseButtons = document.querySelectorAll('.increase');
		let cartItems = localStorage.getItem("productsInCart");
		let currentQuatity = 0;
		let currentProduct = "";
		cartItems = JSON.parse(cartItems);
		
		for(let i=0; i < decreaseButtons.length; i++) {
			decreaseButtons[i].addEventListener('click', () => {
				currentQuatity = decreaseButtons[i].parentElement.querySelector('span').textContent;
				currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent.replace('REMOVE','').trim();						
				if(cartItems[currentProduct].inCart > 1 ){
				cartItems[currentProduct].inCart -= 1;
				cartNumbers(cartItems[currentProduct], "decrease" );
				totalCost(cartItems[currentProduct], "decrease" );
				localStorage.setItem('productsInCart', JSON.stringify(cartItems));
				displayCart();
				}
			});
		}
				
		for(let i=0; i < increaseButtons.length; i++) {
			increaseButtons[i].addEventListener('click', () => {
				currentQuatity = increaseButtons[i].parentElement.querySelector('span').textContent;
				currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent.replace('REMOVE','').trim();							
				cartItems[currentProduct].inCart += 1;
				cartNumbers(cartItems[currentProduct]);
				totalCost(cartItems[currentProduct]);
				localStorage.setItem('productsInCart', JSON.stringify(cartItems));
				displayCart();
			})
		}
	}
	onLoadCartNumbers();
	displayCart();			
}

/**
	END Accessories Table
**/

/**
	 Keyboards & mouse table
**/
var myArray_2 = []
const ranKingsBody_2 = document.querySelector("#myTable_2");

function loadRankings_2 (){
	const request = new XMLHttpRequest();

	request.open("get", "http://ceto.murdoch.edu.au/~33303336/assignment2/Server/GetProductsByCategory.php?Category=2");
	request.onload = () => {
		try{
			const json = JSON.parse(request.responseText);
			populateRankings_2(json);
		} catch (e) {
		}
	};
	request.send();
}
function populateRankings_2 (json){
	myArray_2 = json
	buildTable_2(myArray_2)
}

document.addEventListener("DOMContentLoaded", () => { loadRankings_2(); });

function buildTable_2(data){
	var table = document.getElementById('myTable_2')
	table.innerHTML = ""

	//Validation for table searches
		if(data.length == 0){
		var line="please try again... Product search not found within ' Keyboards & mouse table '";
		var output=line.fontcolor('red');
		document.getElementById("Invalid_2").innerHTML = output;
	}
	else{
		document.getElementById("Invalid_2").innerHTML = "";
	}

	for (var i = 0; i < data.length; i++){
		var row = `<tr>
					<td>${data[i].Name}</td>
					<td>${data[i].CategoryName}</td>
					<td>${data[i].Description}</td>
					<td>$${data[i].Price}</td>
					<td>${data[i].Qty}</td>
					<td><button class="button addCartBtn add-cart2" onClick="alert('Item has been added into your cart!')" >Add Cart</button><button class="button editProductBtn" onClick="editProduct(${data[i].PkID})" >Edit Product</button></td>
		</tr>`
		table.innerHTML += row
	}
	// add to cart
	let carts = document.querySelectorAll('.add-cart2');

	for(let i=0; i < carts.length; i++){
		carts[i].addEventListener('click', () => {
			cartNumbers(data[i]);
			totalCost(data[i]);
		})
	}

	function onLoadCartNumbers(){
		let productNumbers = localStorage.getItem('cartNumbers');
		if(productNumbers){
			document.querySelector('.cart span').textContent = productNumbers;
		}
	}

	function cartNumbers(myArray_2, action) {
		let productNumbers = localStorage.getItem('cartNumbers');
		productNumbers = parseFloat(productNumbers);

		let cartItems = localStorage.getItem('productsInCart');
		cartItems = JSON.parse(cartItems);
		
		if (action == "decrease") {
			localStorage.setItem('cartNumbers', productNumbers -1);
			document.querySelector('.cart span').textContent = productNumbers - 1;
		} else if( productNumbers ) {
			localStorage.setItem("cartNumbers", productNumbers + 1);
			document.querySelector('.cart span').textContent = productNumbers + 1;
		} else {
			localStorage.setItem("cartNumbers", 1);
			document.querySelector('.cart span').textContent = 1;
		}		
		setItems(myArray_2);
	}
		
	function setItems(myArray_2){
		let cartItems = localStorage.getItem('productsInCart');
		cartItems = JSON.parse(cartItems);
		if(cartItems != null){
			myArray_2.inCart = parseFloat(myArray_2.inCart);
			if(cartItems[myArray_2.Name] == undefined) {
				cartItems = {
					...cartItems,
					[myArray_2.Name]: myArray_2					
				}
			}
			cartItems[myArray_2.Name].inCart += 1;
		}else{
			myArray_2.inCart = 1;
			cartItems = {
				[myArray_2.Name]: myArray_2
			}
		}
		localStorage.setItem("productsInCart", JSON.stringify(cartItems));
	}

	function totalCost(myArray_2, action){
		let cartCost = localStorage.getItem('totalCost');
		cartCost = Number(cartCost);

		if( action == "decrease"){
			cartCost = parseFloat(cartCost);
			localStorage.setItem('totalCost', cartCost - myArray_2.Price);
		} else if(cartCost != null){
			myArray_2.Price = parseFloat(myArray_2.Price);
			localStorage.setItem("totalCost", cartCost + myArray_2.Price);
		} else {
			localStorage.setItem("totalCost", myArray_2.Price);
		}
	}

	function displayCart(){
		$("#cartMSG").html("");
		let cartItems = localStorage.getItem("productsInCart");
		cartItems = JSON.parse(cartItems);
		let CartContainer = document.getElementById('cart-products')
		let cartCost = localStorage.getItem('totalCost');

		if(cartItems && CartContainer){
			CartContainer.innerHTML = '';
			Object.values(cartItems).map(item => {
			var row = ` <tr>
					<td class="product">${item.Name}<button class="btn-danger" type="button"> REMOVE</button></td>
					<td>${item.CategoryName}</td>
					<td>${item.Description}</td>
					<td class="total">$${(item.inCart * item.Price).toFixed(2)}</td>	
					<td>${item.Qty}</td>
					<td class="qty"><button class="decrease" type="button">DEC--</button><span id="qty">${item.inCart} </span><button class="increase" type="button">--INC</button></td>	
				</tr>`		
			CartContainer.innerHTML += row
			});
			CartContainer.innerHTML += `
			<div class="basketTotalContainer">
				<h4 class="basketTotalTitle">
					Basket Total
				</h4>
				<h4 class="basketTotal">
					$${cartCost}
				</h4>
			`;
		}
		deleteButtons();
		manageQuantity();
	}

	//Remove table
	function deleteButtons() {
		let deleteButtons = document.querySelectorAll('.btn-danger'); 
		let productName;
		let productNumbers = localStorage.getItem('cartNumbers');
		let cartItems = localStorage.getItem('productsInCart');
		cartItems = JSON.parse(cartItems);
		let cartCost = localStorage.getItem('totalCost');

		for(let i=0; i < deleteButtons.length; i++) {
			deleteButtons[i].addEventListener('click', () => {
				productName = deleteButtons[i].parentElement.textContent.replace('REMOVE','').trim();
				localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart );
				localStorage.setItem('totalCost', cartCost - (cartItems[productName].Price * cartItems[productName].inCart));
				delete cartItems[productName];
				localStorage.setItem('productsInCart', JSON.stringify(cartItems));
				displayCart();
				onLoadCartNumbers();
			});
		}
	}
	//increase & decrease
	function manageQuantity() {
		let decreaseButtons = document.querySelectorAll('.decrease');
		let increaseButtons = document.querySelectorAll('.increase');
		let cartItems = localStorage.getItem("productsInCart");
		let currentQuatity = 0;
		let currentProduct = "";
		cartItems = JSON.parse(cartItems);
		for(let i=0; i < decreaseButtons.length; i++) {
			decreaseButtons[i].addEventListener('click', () => {
				currentQuatity = decreaseButtons[i].parentElement.querySelector('span').textContent;
				currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent.replace('REMOVE','').trim();						
				if(cartItems[currentProduct].inCart > 1 ){
				cartItems[currentProduct].inCart -= 1;
				cartNumbers(cartItems[currentProduct], "decrease" );
				totalCost(cartItems[currentProduct], "decrease" );
				localStorage.setItem('productsInCart', JSON.stringify(cartItems));
				displayCart();
				}
			});
		}
				
		for(let i=0; i < increaseButtons.length; i++) {
			increaseButtons[i].addEventListener('click', () => {
				currentQuatity = increaseButtons[i].parentElement.querySelector('span').textContent;
				currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent.replace('REMOVE','').trim();						

				cartItems[currentProduct].inCart += 1;
				cartNumbers(cartItems[currentProduct]);
				totalCost(cartItems[currentProduct]);
				localStorage.setItem('productsInCart', JSON.stringify(cartItems));
				displayCart();
			})
		}
	}
	onLoadCartNumbers();
	displayCart();
}

/**
	END Keyboards & mouse table
**/

/**
	headset table
**/
var myArray_3 = []
const ranKingsBody_3 = document.querySelector("#myTable_3");

function loadRankings_3 (){
	const request = new XMLHttpRequest();

	request.open("get", "http://ceto.murdoch.edu.au/~33303336/assignment2/Server/GetProductsByCategory.php?Category=3");
	request.onload = () => {
		try{
			const json = JSON.parse(request.responseText);
			populateRankings_3(json);
		} catch (e) {
		}
	};
	request.send();
}

function populateRankings_3 (json){
	myArray_3 = json
	buildTable_3(myArray_3)	
}

document.addEventListener("DOMContentLoaded", () => { loadRankings_3(); });

function buildTable_3(data){
	var table = document.getElementById('myTable_3')
	table.innerHTML = ""

	//Validation for table searches
		if(data.length == 0){
		var line="please try again... Product search not found within ' headset table '";
		var output=line.fontcolor('red');
		document.getElementById("Invalid_3").innerHTML = output;
	}	
	else{
		document.getElementById("Invalid_3").innerHTML = "";
	}

	for (var i = 0; i < data.length; i++){
		var row = `<tr>
					<td>${data[i].Name}</td>
					<td>${data[i].CategoryName}</td>
					<td>${data[i].Description}</td>
					<td>$${data[i].Price}</td>
					<td>${data[i].Qty}</td>
					<td><button class="button addCartBtn add-cart3" onClick="alert('Item has been added into your cart!')" >Add Cart</button><button class="button editProductBtn" onClick="editProduct(${data[i].PkID})" >Edit Product</button></td>

		</tr>`
		table.innerHTML += row
	}
			
	// add to cart
	let carts = document.querySelectorAll('.add-cart3');

	for(let i=0; i < carts.length; i++){
		carts[i].addEventListener('click', () => {
			cartNumbers(data[i]);
			totalCost(data[i]);
		})
	}

	function onLoadCartNumbers(){
		let productNumbers = localStorage.getItem('cartNumbers');
		if(productNumbers){
			document.querySelector('.cart span').textContent = productNumbers;
		}
	}

	function cartNumbers(myArray_3, action) {
		let productNumbers = localStorage.getItem('cartNumbers');
		productNumbers = parseFloat(productNumbers);

		let cartItems = localStorage.getItem('productsInCart');
		cartItems = JSON.parse(cartItems);
		
		if (action == "decrease") {
			localStorage.setItem('cartNumbers', productNumbers -1);
			document.querySelector('.cart span').textContent = productNumbers - 1;
		} else if( productNumbers ) {
			localStorage.setItem("cartNumbers", productNumbers + 1);
			document.querySelector('.cart span').textContent = productNumbers + 1;
		} else {
			localStorage.setItem("cartNumbers", 1);
			document.querySelector('.cart span').textContent = 1;
		}			
		setItems(myArray_3);
	}
		
	function setItems(myArray_3){
		let cartItems = localStorage.getItem('productsInCart');
		cartItems = JSON.parse(cartItems);
		if(cartItems != null){
			myArray_3.inCart = parseFloat(myArray_3.inCart);
			if(cartItems[myArray_3.Name] == undefined) {
				cartItems = {
					...cartItems,
					[myArray_3.Name]: myArray_3					
				}
			}
			cartItems[myArray_3.Name].inCart += 1;
		}else{
			myArray_3.inCart = 1;
			cartItems = {
				[myArray_3.Name]: myArray_3
			}
		}
		localStorage.setItem("productsInCart", JSON.stringify(cartItems));
	}

	function totalCost(myArray_3, action){
		let cartCost = localStorage.getItem('totalCost');
		cartCost = Number(cartCost);

		if( action == "decrease"){
			cartCost = parseFloat(cartCost);
			localStorage.setItem('totalCost', cartCost - myArray_3.Price);
		} else if(cartCost != null){
			myArray_3.Price = parseFloat(myArray_3.Price);
			localStorage.setItem("totalCost", cartCost + myArray_3.Price);
		} else {
			localStorage.setItem("totalCost", myArray_3.Price);
		}
	}

	function displayCart(){
		$("#cartMSG").html("");
		let cartItems = localStorage.getItem("productsInCart");
		cartItems = JSON.parse(cartItems);
		let CartContainer = document.getElementById('cart-products')
		let cartCost = localStorage.getItem('totalCost');

		if(cartItems && CartContainer){
			CartContainer.innerHTML = '';
			Object.values(cartItems).map(item => {
			var row = ` <tr>
					<td class="product">${item.Name}<button class="btn-danger" type="button"> REMOVE</button></td>
					<td>${item.CategoryName}</td>
					<td>${item.Description}</td>
					<td class="total">$${(item.inCart * item.Price).toFixed(2)}</td>	
					<td>${item.Qty}</td>
					<td class="qty"><button class="decrease" type="button">DEC--</button><span id="qty">${item.inCart} </span><button class="increase" type="button">--INC</button></td>	
				</tr>`		
			CartContainer.innerHTML += row
			});
			
			CartContainer.innerHTML += `
			<div class="basketTotalContainer">
				<h4 class="basketTotalTitle">
					Basket Total
				</h4>
				<h4 class="basketTotal">
					$${cartCost}
				</h4>
			`;
		}
		deleteButtons();
		manageQuantity();
	}

	//Remove table
	function deleteButtons() {
		let deleteButtons = document.querySelectorAll('.btn-danger'); 
		let productName;
		let productNumbers = localStorage.getItem('cartNumbers');
		let cartItems = localStorage.getItem('productsInCart');
		cartItems = JSON.parse(cartItems);
		let cartCost = localStorage.getItem('totalCost');

		for(let i=0; i < deleteButtons.length; i++) {
			deleteButtons[i].addEventListener('click', () => {
				productName = deleteButtons[i].parentElement.textContent.replace('REMOVE','').trim();
				localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart );
				localStorage.setItem('totalCost', cartCost - (cartItems[productName].Price * cartItems[productName].inCart));
				delete cartItems[productName];
				localStorage.setItem('productsInCart', JSON.stringify(cartItems));
				displayCart();
				onLoadCartNumbers();
			});
		}
	}
	//increase & decrease
	function manageQuantity() {
		let decreaseButtons = document.querySelectorAll('.decrease');
		let increaseButtons = document.querySelectorAll('.increase');
		let cartItems = localStorage.getItem("productsInCart");
		let currentQuatity = 0;
		let currentProduct = "";
		cartItems = JSON.parse(cartItems);
		for(let i=0; i < decreaseButtons.length; i++) {
			decreaseButtons[i].addEventListener('click', () => {
				currentQuatity = decreaseButtons[i].parentElement.querySelector('span').textContent;
				currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent.replace('REMOVE','').trim();						
				if(cartItems[currentProduct].inCart > 1 ){
				cartItems[currentProduct].inCart -= 1;
				cartNumbers(cartItems[currentProduct], "decrease" );
				totalCost(cartItems[currentProduct], "decrease" );
				localStorage.setItem('productsInCart', JSON.stringify(cartItems));
				displayCart();
				}
			});
		}
				
		for(let i=0; i < increaseButtons.length; i++) {
			increaseButtons[i].addEventListener('click', () => {
				currentQuatity = increaseButtons[i].parentElement.querySelector('span').textContent;
				currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent.replace('REMOVE','').trim();						
				cartItems[currentProduct].inCart += 1;
				cartNumbers(cartItems[currentProduct]);
				totalCost(cartItems[currentProduct]);
				localStorage.setItem('productsInCart', JSON.stringify(cartItems));
				displayCart();
			})
		}
	}

	onLoadCartNumbers();
	displayCart();
}
/**
	END HEADSET TABLE
**/


/**
	Gaming hardware table
**/
var myArray_4 = []
const ranKingsBody_4 = document.querySelector("#myTable_4");

function loadRankings_4 (){
	const request = new XMLHttpRequest();

	request.open("get", "http://ceto.murdoch.edu.au/~33303336/assignment2/Server/GetProductsByCategory.php?Category=4");
	request.onload = () => {
		try{
			const json = JSON.parse(request.responseText);
			populateRankings_4(json);
		} catch (e) {
		}
	};
	request.send();
}
function populateRankings_4 (json){
	myArray_4 = json
	buildTable_4(myArray_4)
}

document.addEventListener("DOMContentLoaded", () => { loadRankings_4(); });

function buildTable_4(data){
	var table = document.getElementById('myTable_4')
	table.innerHTML = ""

	//Validation for table searches
	if(data.length == 0){
	var line="please try again... Product search not found within ' Gaming hardware table '";
	var output=line.fontcolor('red');
	document.getElementById("Invalid_4").innerHTML = output;
	}
	else{
		document.getElementById("Invalid_4").innerHTML = "";
	}

	for (var i = 0; i < data.length; i++){
		var row = `<tr>
					<td>${data[i].Name}</td>
					<td>${data[i].CategoryName}</td>
					<td>${data[i].Description}</td>
					<td>$${data[i].Price}</td>
					<td>${data[i].Qty}</td>
					<td><button class="button addCartBtn add-cart4" onClick="alert('Item has been added into your cart!')" >Add Cart</button><button class="button editProductBtn" onClick="editProduct(${data[i].PkID})" >Edit Product</button></td>
		</tr>`
		table.innerHTML += row
	}

	// add to cart
	let carts = document.querySelectorAll('.add-cart4');

	for(let i=0; i < carts.length; i++){
		carts[i].addEventListener('click', () => {
			cartNumbers(data[i]);
			totalCost(data[i]);
		})
	}

	function onLoadCartNumbers(){
		let productNumbers = localStorage.getItem('cartNumbers');
		if(productNumbers){
			document.querySelector('.cart span').textContent = productNumbers;
		}
	}

	function cartNumbers(myArray_4, action) {
		let productNumbers = localStorage.getItem('cartNumbers');
		productNumbers = parseFloat(productNumbers);

		let cartItems = localStorage.getItem('productsInCart');
		cartItems = JSON.parse(cartItems);
		
		if (action == "decrease") {
			localStorage.setItem('cartNumbers', productNumbers -1);
			document.querySelector('.cart span').textContent = productNumbers - 1;
		} else if( productNumbers ) {
			localStorage.setItem("cartNumbers", productNumbers + 1);
			document.querySelector('.cart span').textContent = productNumbers + 1;
		} else {
			localStorage.setItem("cartNumbers", 1);
			document.querySelector('.cart span').textContent = 1;
		}		
		setItems(myArray_4);
	}
	function setItems(myArray_4){
		let cartItems = localStorage.getItem('productsInCart');
		cartItems = JSON.parse(cartItems);
		if(cartItems != null){
			myArray_4.inCart = parseFloat(myArray_4.inCart);
			if(cartItems[myArray_4.Name] == undefined) {
				cartItems = {
					...cartItems,
					[myArray_4.Name]: myArray_4					
				}
			}
			cartItems[myArray_4.Name].inCart += 1;
		}else{
			myArray_4.inCart = 1;
			cartItems = {
				[myArray_4.Name]: myArray_4
			}
		}
		localStorage.setItem("productsInCart", JSON.stringify(cartItems));
	}

	function totalCost(myArray_4, action){
		let cartCost = localStorage.getItem('totalCost');
		cartCost = Number(cartCost);

		if( action == "decrease"){
			cartCost = parseFloat(cartCost);
			localStorage.setItem('totalCost', cartCost - myArray_4.Price);
		} else if(cartCost != null){
			myArray_4.Price = parseFloat(myArray_4.Price);
			localStorage.setItem("totalCost", cartCost + myArray_4.Price);
		} else {
			localStorage.setItem("totalCost", myArray_4.Price);
		}
	}

	function displayCart(){
		$("#cartMSG").html("");
		let cartItems = localStorage.getItem("productsInCart");
		cartItems = JSON.parse(cartItems);
		let CartContainer = document.getElementById('cart-products')
		let cartCost = localStorage.getItem('totalCost');

		if(cartItems && CartContainer){
			CartContainer.innerHTML = '';
			Object.values(cartItems).map(item => {
			var row = ` <tr>
					<td class="product">${item.Name}<button class="btn-danger" type="button"> REMOVE</button></td>
					<td>${item.CategoryName}</td>
					<td>${item.Description}</td>
					<td class="total">$${(item.inCart * item.Price).toFixed(2)}</td>
					<td>${item.Qty}</td>	
					<td class="qty"><button class="decrease" type="button">DEC--</button><span id="qty">${item.inCart} </span><button class="increase" type="button">--INC</button></td>	
				</tr>`		
			CartContainer.innerHTML += row
			});
			
			CartContainer.innerHTML += `
			<div class="basketTotalContainer">
				<h4 class="basketTotalTitle">
					Basket Total
				</h4>
				<h4 class="basketTotal">
					$${cartCost}
				</h4>
			`;
		}
		deleteButtons();
		manageQuantity();
	}

	//Remove table
	function deleteButtons() {
		let deleteButtons = document.querySelectorAll('.btn-danger'); 
		let productName;
		let productNumbers = localStorage.getItem('cartNumbers');
		let cartItems = localStorage.getItem('productsInCart');
		cartItems = JSON.parse(cartItems);
		let cartCost = localStorage.getItem('totalCost');
	
		for(let i=0; i < deleteButtons.length; i++) {
			deleteButtons[i].addEventListener('click', () => {
				productName = deleteButtons[i].parentElement.textContent.replace('REMOVE','').trim();
				localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart );
				localStorage.setItem('totalCost', cartCost - (cartItems[productName].Price * cartItems[productName].inCart));
				delete cartItems[productName];
				localStorage.setItem('productsInCart', JSON.stringify(cartItems));
				displayCart();
				onLoadCartNumbers();
			});
		}
	}
	//increase & decrease
	function manageQuantity() {
		let decreaseButtons = document.querySelectorAll('.decrease');
		let increaseButtons = document.querySelectorAll('.increase');
		let cartItems = localStorage.getItem("productsInCart");
		let currentQuatity = 0;
		let currentProduct = "";
		cartItems = JSON.parse(cartItems);
	
		for(let i=0; i < decreaseButtons.length; i++) {
			decreaseButtons[i].addEventListener('click', () => {
				currentQuatity = decreaseButtons[i].parentElement.querySelector('span').textContent;
				currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent.replace('REMOVE','').trim();						
				if(cartItems[currentProduct].inCart > 1 ){
				cartItems[currentProduct].inCart -= 1;
				cartNumbers(cartItems[currentProduct], "decrease" );
				totalCost(cartItems[currentProduct], "decrease" );
				localStorage.setItem('productsInCart', JSON.stringify(cartItems));
				displayCart();
				}
			});
		}
		
		for(let i=0; i < increaseButtons.length; i++) {
			increaseButtons[i].addEventListener('click', () => {
				currentQuatity = increaseButtons[i].parentElement.querySelector('span').textContent;
				currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent.replace('REMOVE','').trim();						
				cartItems[currentProduct].inCart += 1;
				cartNumbers(cartItems[currentProduct]);
				totalCost(cartItems[currentProduct]);
				localStorage.setItem('productsInCart', JSON.stringify(cartItems));
				displayCart();
			})
		}
	}
	onLoadCartNumbers();
	displayCart();
}
/**
	END Gaming hardware table
**/


/**
	Mobile Phone table
**/
var myArray_5 = []
const ranKingsBody_5 = document.querySelector("#myTable_5");

function loadRankings_5 (){
	const request = new XMLHttpRequest();

	request.open("get", "http://ceto.murdoch.edu.au/~33303336/assignment2/Server/GetProductsByCategory.php?Category=5");
	request.onload = () => {
		try{
			const json = JSON.parse(request.responseText);
			populateRankings_5(json);
		} catch (e) {
		}
	};

	request.send();
}
function populateRankings_5 (json){
	myArray_5 = json
	buildTable_5(myArray_5)
		
}

document.addEventListener("DOMContentLoaded", () => { loadRankings_5(); });

function buildTable_5(data){
	var table = document.getElementById('myTable_5')
	table.innerHTML = ""

	//Validation for table searches
		if(data.length == 0){
		var line="please try again... Product search not found within ' Mobile Phone table '";
		var output=line.fontcolor('red');
		document.getElementById("Invalid_5").innerHTML = output;
	}
	else{
		document.getElementById("Invalid_5").innerHTML = "";
	}

	for (var i = 0; i < data.length; i++){
		var row = `<tr>
					<td>${data[i].Name}</td>
					<td>${data[i].CategoryName}</td>
					<td>${data[i].Description}</td>
					<td>$${data[i].Price}</td>
					<td>${data[i].Qty}</td>
					<td><button class="button addCartBtn add-cart5" onClick="alert('Item has been added into your cart!')" >Add Cart</button><button class="button editProductBtn" onClick="editProduct(${data[i].PkID})" >Edit Product</button></td>
		</tr>`
		table.innerHTML += row
	}

	// add to cart
	let carts = document.querySelectorAll('.add-cart5');

	for(let i=0; i < carts.length; i++){
		carts[i].addEventListener('click', () => {
			cartNumbers(data[i]);
			totalCost(data[i]);
		})
	}

	function onLoadCartNumbers(){
		let productNumbers = localStorage.getItem('cartNumbers');
		if(productNumbers){
			document.querySelector('.cart span').textContent = productNumbers;
		}
	}

	function cartNumbers(myArray_5, action) {
		let productNumbers = localStorage.getItem('cartNumbers');
		productNumbers = parseFloat(productNumbers);

		let cartItems = localStorage.getItem('productsInCart');
		cartItems = JSON.parse(cartItems);
		
		if (action == "decrease") {
			localStorage.setItem('cartNumbers', productNumbers -1);
			document.querySelector('.cart span').textContent = productNumbers - 1;
		} else if( productNumbers ) {
			localStorage.setItem("cartNumbers", productNumbers + 1);
			document.querySelector('.cart span').textContent = productNumbers + 1;
		} else {
			localStorage.setItem("cartNumbers", 1);
			document.querySelector('.cart span').textContent = 1;
		}		
		setItems(myArray_5);
	}
		
	function setItems(myArray_5){
		let cartItems = localStorage.getItem('productsInCart');
		cartItems = JSON.parse(cartItems);
		if(cartItems != null){
			myArray_5.inCart = parseFloat(myArray_5.inCart);
			if(cartItems[myArray_5.Name] == undefined) {
				cartItems = {
					...cartItems,
					[myArray_5.Name]: myArray_5					
				}
			}
			cartItems[myArray_5.Name].inCart += 1;
		}else{
			myArray_5.inCart = 1;
			cartItems = {
				[myArray_5.Name]: myArray_5
			}
		}
		localStorage.setItem("productsInCart", JSON.stringify(cartItems));
	}

	function totalCost(myArray_5, action){
		let cartCost = localStorage.getItem('totalCost');
		cartCost = Number(cartCost);

		if( action == "decrease"){
			cartCost = parseFloat(cartCost);
			localStorage.setItem('totalCost', cartCost - myArray_5.Price);
		} else if(cartCost != null){
			myArray_5.Price = parseFloat(myArray_5.Price);
			localStorage.setItem("totalCost", cartCost + myArray_5.Price);
		} else {
			localStorage.setItem("totalCost", myArray_5.Price);
		}
	}

	function displayCart(){
		$("#cartMSG").html("");
		let cartItems = localStorage.getItem("productsInCart");
		cartItems = JSON.parse(cartItems);
		let CartContainer = document.getElementById('cart-products')
		let cartCost = localStorage.getItem('totalCost');

		if(cartItems && CartContainer){
			CartContainer.innerHTML = '';
			Object.values(cartItems).map(item => {
			var row = ` <tr>
					<td class="product">${item.Name}<button class="btn-danger" type="button"> REMOVE</button></td>
					<td>${item.CategoryName}</td>
					<td>${item.Description}</td>
					<td class="total">$${(item.inCart * item.Price).toFixed(2)}</td>	
					<td>${item.Qty}</td>
					<td class="qty"><button class="decrease" type="button">DEC--</button><span id="qty">${item.inCart} </span><button class="increase" type="button">--INC</button></td>	
				</tr>`		
			CartContainer.innerHTML += row
			});
			
			CartContainer.innerHTML += `
			<div class="basketTotalContainer">
				<h4 class="basketTotalTitle">
					Basket Total
				</h4>
				<h4 class="basketTotal">
					$${cartCost}
				</h4>
			`;
		}
		deleteButtons();
		manageQuantity();
	}

	//Remove table
	function deleteButtons() {
		let deleteButtons = document.querySelectorAll('.btn-danger'); 
		let productName;
		let productNumbers = localStorage.getItem('cartNumbers');
		let cartItems = localStorage.getItem('productsInCart');
		cartItems = JSON.parse(cartItems);
		let cartCost = localStorage.getItem('totalCost');
		
		for(let i=0; i < deleteButtons.length; i++) {
			deleteButtons[i].addEventListener('click', () => {
				productName = deleteButtons[i].parentElement.textContent.replace('REMOVE','').trim();
				localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart );
				localStorage.setItem('totalCost', cartCost - (cartItems[productName].Price * cartItems[productName].inCart));
				delete cartItems[productName];
				localStorage.setItem('productsInCart', JSON.stringify(cartItems));
				displayCart();
				onLoadCartNumbers();
			});
		}
	}
	//increase & decrease
	function manageQuantity() {
		let decreaseButtons = document.querySelectorAll('.decrease');
		let increaseButtons = document.querySelectorAll('.increase');
		let cartItems = localStorage.getItem("productsInCart");
		let currentQuatity = 0;
		let currentProduct = "";
		cartItems = JSON.parse(cartItems);
		for(let i=0; i < decreaseButtons.length; i++) {
			decreaseButtons[i].addEventListener('click', () => {
				currentQuatity = decreaseButtons[i].parentElement.querySelector('span').textContent;
				currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent.replace('REMOVE','').trim();						
				if(cartItems[currentProduct].inCart > 1 ){
				cartItems[currentProduct].inCart -= 1;
				cartNumbers(cartItems[currentProduct], "decrease" );
				totalCost(cartItems[currentProduct], "decrease" );
				localStorage.setItem('productsInCart', JSON.stringify(cartItems));
				displayCart();
				}
			});
		}
				
		for(let i=0; i < increaseButtons.length; i++) {
			increaseButtons[i].addEventListener('click', () => {
				currentQuatity = increaseButtons[i].parentElement.querySelector('span').textContent;
				currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent.replace('REMOVE','').trim();						
				cartItems[currentProduct].inCart += 1;
				cartNumbers(cartItems[currentProduct]);
				totalCost(cartItems[currentProduct]);
				localStorage.setItem('productsInCart', JSON.stringify(cartItems));
				displayCart();
			})
		}
	}
	onLoadCartNumbers();
	displayCart();
}
/**
	end Mobile Phone table
**/

/** 
	Software table
**/
var myArray_6 = []
const ranKingsBody_6 = document.querySelector("#myTable_6");

function loadRankings_6 (){
	const request = new XMLHttpRequest();

	request.open("get", "http://ceto.murdoch.edu.au/~33303336/assignment2/Server/GetProductsByCategory.php?Category=6");
	request.onload = () => {
		try{
			const json = JSON.parse(request.responseText);
			populateRankings_6(json);
		} catch (e) {
		}
	};

	request.send();
}
function populateRankings_6 (json){
	myArray_6 = json
	buildTable_6(myArray_6)
}

document.addEventListener("DOMContentLoaded", () => { loadRankings_6(); });

function buildTable_6(data){
	var table = document.getElementById('myTable_6')
	table.innerHTML = ""

	//Validation for table searches
	if(data.length == 0){
		var line="please try again... Product search not found within ' Software table '";
		var output=line.fontcolor('red');
		document.getElementById("Invalid_6").innerHTML = output;
	}
	else{
		document.getElementById("Invalid_6").innerHTML = "";
	}

	for (var i = 0; i < data.length; i++){
		var row = `<tr>
					<td>${data[i].Name}</td>
					<td>${data[i].CategoryName}</td>
					<td>${data[i].Description}</td>
					<td>$${data[i].Price}</td>
					<td>${data[i].Qty}</td>
					<td><button class="button addCartBtn add-cart6" onClick="alert('Item has been added into your cart!')" >Add Cart</button><button class="button editProductBtn" onClick="editProduct(${data[i].PkID})" >Edit Product</button></td>
		</tr>`
		table.innerHTML += row

	}
			
	// add to cart
	let carts = document.querySelectorAll('.add-cart6');

	for(let i=0; i < carts.length; i++){
		carts[i].addEventListener('click', () => {
			cartNumbers(data[i]);
			totalCost(data[i]);
		})
	}

	function onLoadCartNumbers(){
		let productNumbers = localStorage.getItem('cartNumbers');
		if(productNumbers){
			document.querySelector('.cart span').textContent = productNumbers;
		}
	}

	function cartNumbers(myArray_6, action) {
		let productNumbers = localStorage.getItem('cartNumbers');
		productNumbers = parseFloat(productNumbers);

		let cartItems = localStorage.getItem('productsInCart');
		cartItems = JSON.parse(cartItems);
		
		if (action == "decrease") {
			localStorage.setItem('cartNumbers', productNumbers -1);
			document.querySelector('.cart span').textContent = productNumbers - 1;
		} else if( productNumbers ) {
			localStorage.setItem("cartNumbers", productNumbers + 1);
			document.querySelector('.cart span').textContent = productNumbers + 1;
		} else {
			localStorage.setItem("cartNumbers", 1);
			document.querySelector('.cart span').textContent = 1;
		}			
		setItems(myArray_6);
	}
		
	function setItems(myArray_6){
		let cartItems = localStorage.getItem('productsInCart');
		cartItems = JSON.parse(cartItems);
		if(cartItems != null){
			myArray_6.inCart = parseFloat(myArray_6.inCart);
			if(cartItems[myArray_6.Name] == undefined) {
				cartItems = {
					...cartItems,
					[myArray_6.Name]: myArray_6					
				}
			}
			cartItems[myArray_6.Name].inCart += 1;
		}else{
			myArray_6.inCart = 1;
			cartItems = {
				[myArray_6.Name]: myArray_6
			}
		}
		localStorage.setItem("productsInCart", JSON.stringify(cartItems));
	}

	function totalCost(myArray_6, action){
		let cartCost = localStorage.getItem('totalCost');
		cartCost = Number(cartCost);

		if( action == "decrease"){
			cartCost = parseFloat(cartCost);
			localStorage.setItem('totalCost', cartCost - myArray_6.Price);
		} else if(cartCost != null){
			myArray_6.Price = parseFloat(myArray_6.Price);
			localStorage.setItem("totalCost", cartCost + myArray_6.Price);
		} else {
			localStorage.setItem("totalCost", myArray_6.Price);
		}
	}
			
	function displayCart(){
		$("#cartMSG").html("");
		let cartItems = localStorage.getItem("productsInCart");
		cartItems = JSON.parse(cartItems);
		let CartContainer = document.getElementById('cart-products')
		let cartCost = localStorage.getItem('totalCost');

		if(cartItems && CartContainer){
			CartContainer.innerHTML = '';
			Object.values(cartItems).map(item => {
			var row = ` <tr>
					<td class="product">${item.Name}<button class="btn-danger" type="button"> REMOVE</button></td>
					<td>${item.CategoryName}</td>
					<td>${item.Description}</td>
					<td class="total">$${(item.inCart * item.Price).toFixed(2)}</td>	
					<td>${item.Qty}</td>
					<td class="qty"><button class="decrease" type="button">DEC--</button><span id="qty">${item.inCart} </span><button class="increase" type="button">--INC</button></td>	
				</tr>`		
			CartContainer.innerHTML += row
			});
			
			CartContainer.innerHTML += `
			<div class="basketTotalContainer">
				<h4 class="basketTotalTitle">
					Basket Total
				</h4>
				<h4 class="basketTotal">
					$${cartCost}
				</h4>
			`;
		}
		deleteButtons();
		manageQuantity();
	}
			
	//Remove table
	function deleteButtons() {
		let deleteButtons = document.querySelectorAll('.btn-danger'); 
		let productName;
		let productNumbers = localStorage.getItem('cartNumbers');
		let cartItems = localStorage.getItem('productsInCart');
		cartItems = JSON.parse(cartItems);
		let cartCost = localStorage.getItem('totalCost');

		for(let i=0; i < deleteButtons.length; i++) {
			deleteButtons[i].addEventListener('click', () => {
				productName = deleteButtons[i].parentElement.textContent.replace('REMOVE','').trim();			
				localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart );
				localStorage.setItem('totalCost', cartCost - (cartItems[productName].Price * cartItems[productName].inCart));
				delete cartItems[productName];
				localStorage.setItem('productsInCart', JSON.stringify(cartItems));
				displayCart();
				onLoadCartNumbers();
			});
		}
	}
	//increase & decrease
	function manageQuantity() {
		let decreaseButtons = document.querySelectorAll('.decrease');
		let increaseButtons = document.querySelectorAll('.increase');
		let cartItems = localStorage.getItem("productsInCart");
		let currentQuatity = 0;
		let currentProduct = "";
		cartItems = JSON.parse(cartItems);
		for(let i=0; i < decreaseButtons.length; i++) {
			decreaseButtons[i].addEventListener('click', () => {
				currentQuatity = decreaseButtons[i].parentElement.querySelector('span').textContent;
				currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent.replace('REMOVE','').trim();						
				if(cartItems[currentProduct].inCart > 1 ){
				cartItems[currentProduct].inCart -= 1;
				cartNumbers(cartItems[currentProduct], "decrease" );
				totalCost(cartItems[currentProduct], "decrease" );
				localStorage.setItem('productsInCart', JSON.stringify(cartItems));
				displayCart();
				}
			});
		}
				
		for(let i=0; i < increaseButtons.length; i++) {
			increaseButtons[i].addEventListener('click', () => {
				currentQuatity = increaseButtons[i].parentElement.querySelector('span').textContent;
				currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent.replace('REMOVE','').trim();						
				cartItems[currentProduct].inCart += 1;
				cartNumbers(cartItems[currentProduct]);
				totalCost(cartItems[currentProduct]);
				localStorage.setItem('productsInCart', JSON.stringify(cartItems));
				displayCart();
			})
		}
	}
	onLoadCartNumbers();
	displayCart();
}
/** 
	END Software table
**/

//Purchase order function
$('#purchaseBtn').click(function() {
	$("#cartMSG").html("");
	let cartItems = localStorage.getItem("productsInCart");
	$.post('http://ceto.murdoch.edu.au/~33303336/assignment2/Server/Purchase.php',{items:JSON.stringify(cartItems)}, function(data, status) {
	if (status == "success"){
		let response = JSON.parse(data);
		if(response == "SUCCESS"){
			localStorage.removeItem("productsInCart");
			localStorage.removeItem("totalCost");
			localStorage.removeItem("cartNumbers");
			window.location.href = "#home";
			location.reload(); //Needed to update the products and cart
			alert("Thankyou, your purchase was successful and the number of available products has been updated.");
		}
		else {
			$("#cartMSG").html("Error placing order, some items do not have sufficient quantity available.");
		}
	}
	});
}); 

//Display edit product page
function editProduct(pid){
	window.location.hash = "#editProduct";
	$.get('http://ceto.murdoch.edu.au/~33303336/assignment2/Server/GetProducts.php?ID=' + pid, function(data, status){
		let productData = JSON.parse(data);
		productData = productData[0];
		$("#editProduct_type").val(productData['FkProductCategory']).change();
		$("#editProduct_name").val(productData['Name']);
		$("#editProduct_Desc").val(productData['Description']);
		$("#editProduct_price").val(productData['Price']);
		$("#editProduct_qty").val(productData['Qty']);
		$("#editProduct_productID").val(productData['PkID']);
	});
}

//Edit product
$('#editProductBtn').click(function() {
	$("#editProductMSG").html("");
	let editData = {};

	if(!$("#editProduct_name").val()){
		$("#editProductMSG").html("Please enter the product name.");
	}
	else if(!$("#editProduct_Desc").val()){
		$("#editProductMSG").html("Please enter the product description.");
	}
	else if(!$("#editProduct_price").val()){
		$("#editProductMSG").html("Please enter the product price.");
	}
	else if(!$("#editProduct_qty").val()){
		$("#editProductMSG").html("Please enter the product quantity.");
	}
	else {
		$("#editAccountMSG").html("");
		//Prepare POST data
		editData['productID'] = $("#editProduct_productID").val();
		editData['category'] = $("#editProduct_type").val();
		editData['name'] = $("#editProduct_name").val();
		editData['description'] = $("#editProduct_Desc").val();
		editData['price'] = $("#editProduct_price").val();
		editData['qty'] = $("#editProduct_qty").val();

		$.post('http://ceto.murdoch.edu.au/~33303336/assignment2/Server/UpdateProduct.php',{edit:JSON.stringify(editData)}, function(data, status) {
		if (status == "success"){
			let response = JSON.parse(data);
			
			if(response == "Update Success"){
				alert("Product updated successfully");
				window.location.href = "#products";
				location.reload(); //Needed to update the products and cart
			}
			else {
				$("#editProductMSG").html(response);
			}
		}
		});
	}
}); 

$('#deleteProductBtn').click(function() {
	productID = $("#editProduct_productID").val();
	$("#editProductMSG").html("");
	$.post('http://ceto.murdoch.edu.au/~33303336/assignment2/Server/DeleteProduct.php',{product:JSON.stringify(productID)}, function(data, status) {
	if (status == "success"){
		let response = JSON.parse(data);	
		if(response="Success"){
			alert("Product deleted successfully");
			window.location.href = "#home";
			location.reload(); //Needed to update the products and cart
		}
		else {
			$("#editProduct_productID").html(response);
		}
	}
	});
}); 

//Edit product
$('#newProductBtn').click(function() {
	$("#newProductMSG").html("");
	let productData = {};

	if(!$("#newProduct_name").val()){
		$("#newProductMSG").html("Please enter the product name.");
	}
	else if(!$("#newProduct_Desc").val()){
		$("#newProductMSG").html("Please enter the product description.");
	}
	else if(!$("#newProduct_price").val()){
		$("#newProductMSG").html("Please enter the product price.");
	}
	else if(!$("#newProduct_qty").val()){
		$("#newProductMSG").html("Please enter the product quantity.");
	}
	else {
		$("#newAccountMSG").html("");
		//Prepare POST data
		productData['category'] = $("#newProduct_type").val();
		productData['name'] = $("#newProduct_name").val();
		productData['description'] = $("#newProduct_Desc").val();
		productData['price'] = $("#newProduct_price").val();
		productData['qty'] = $("#newProduct_qty").val();

		$.post('http://ceto.murdoch.edu.au/~33303336/assignment2/Server/CreateProduct.php',{product:JSON.stringify(productData)}, function(data, status) {
		if (status == "success"){
			let response = JSON.parse(data);
			if(response == "SUCCESS"){
				alert("Product created successfully");
				window.location.href = "#home";
				location.reload(); //Needed to update the products and cart
			}
			else {
				$("#newProductMSG").html("Error creating new product");
			}
		}
		});
	}
}); 