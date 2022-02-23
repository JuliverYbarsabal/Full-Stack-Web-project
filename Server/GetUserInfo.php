<?php
header('Access-Control-Allow-Origin: *');

if(!isset($_GET['SID'])){
	exit(0);
}
session_id($_GET['SID']);
session_start();

//Open the database connection
include 'DBConnection.php';

//Return the data for the current user
if(isset($_SESSION['AuthUser'])){
	$userID = $_SESSION['AuthUser']['UserID'];	
	$sql = "SELECT UserName, FName, LName, StreetAddress, EmailAddress, Phone FROM tblUser WHERE PkID = '$userID'";
	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()){
			$data[] = $row;
		}
	}
	if(isset($data)){
		echo json_encode($data[0]);
	}
	else {
		echo json_encode(0);
	}
}

$conn->close();
?>