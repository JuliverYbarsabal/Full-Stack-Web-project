<?php
header('Access-Control-Allow-Origin: *');

//Open the database connection
include 'DBConnection.php';

if(isset($_POST['user'])){
	$UserID = json_decode($_POST['user']);

	$sql = "DELETE FROM tblUser WHERE tblUser.PkID = $UserID";

	if ($conn->query($sql) === TRUE) {
		echo json_encode("Success");
	} else {
		echo json_encode("Error deleting user");
	}

}
$conn->close(); 