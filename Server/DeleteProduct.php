<?php
header('Access-Control-Allow-Origin: *');

//Open the database connection
include 'DBConnection.php';

if(isset($_POST['product'])){
	$ProductID = json_decode($_POST['product']);

	$sql = "DELETE FROM tblProduct WHERE tblProduct.PkID = $ProductID";

	if ($conn->query($sql) === TRUE) {
		echo json_encode("Success");
	} else {
		echo json_encode("Error deleting product");
	}

}
$conn->close(); 
?>