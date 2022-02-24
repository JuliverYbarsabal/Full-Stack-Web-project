<?php
header('Access-Control-Allow-Origin: *');

//Open the database connection
include 'DBConnection.php';

//Update user
if(isset($_POST['edit'])){
	$update = json_decode($_POST['edit']);
	$ProductID = $conn->real_escape_string($update->productID);
	$name = $conn->real_escape_string($update->name);
	$description = $conn->real_escape_string($update->description);
	$price = $conn->real_escape_string($update->price);
	$qty = $conn->real_escape_string($update->qty);
	$category = $conn->real_escape_string($update->category);

	$sql = "UPDATE tblProduct
	SET Name='$name', Description='$description', Price=$price, Qty=$qty, FkProductCategory=$category
	WHERE PkID = '$ProductID'";

	if ($conn->query($sql) === TRUE) {
		echo json_encode("Update Success");
	} else {
		echo json_encode("Error updating product");
	}
}
$conn->close();
?>