<?php
header('Access-Control-Allow-Origin: *');

//Open the database connection
include 'DBConnection.php';

//Create user
if(isset($_POST['register'])){
	$register = json_decode($_POST['register']);
	$username = $conn->real_escape_string($register->username);
	$fname = $conn->real_escape_string($register->fname);
	$lname = $conn->real_escape_string($register->lname);
	$staddress = $conn->real_escape_string($register->staddress);
	$email = $conn->real_escape_string($register->email);
	$phone = $conn->real_escape_string($register->phone);
	$password = $conn->real_escape_string($register->password);

	$sql = "INSERT INTO tblUser(UserName, Password, FName, LName, StreetAddress, EmailAddress, Phone, FkUserCategory)
	VALUES('$username', '$password', '$fname', '$lname', '$staddress', '$email', '$phone', 1)";
	
	if ($conn->query($sql) === TRUE) {
		echo json_encode("Register success");
	} else {
		echo json_encode("Error creating new user");
	}
}
$conn->close();
?>