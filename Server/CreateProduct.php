<?php
header('Access-Control-Allow-Origin: *');

//Open the database connection
include 'DBConnection.php';

//Create new product
if(isset($_POST['product'])){
	$data = json_decode($_POST['product']);
	$name = $conn->real_escape_string($data->name);
	$description = $conn->real_escape_string($data->description);
	$price = $conn->real_escape_string($data->price);
	$qty = $conn->real_escape_string($data->qty);
	$category = $conn->real_escape_string($data->category);

	$sql = "INSERT INTO tblProduct(Name, Description, Price, Qty, FkProductCategory)
	VALUES('$name', '$description', $price, $qty, $category)";
	
	if ($conn->query($sql) === TRUE) {
		echo json_encode("SUCCESS");
	} else {
		echo json_encode("ERROR");
	}
}
$conn->close();
?>