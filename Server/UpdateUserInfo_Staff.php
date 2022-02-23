<?php
header('Access-Control-Allow-Origin: *');

//Open the database connection
include 'DBConnection.php';

//Update user
if(isset($_POST['edit'])){
	$update = json_decode($_POST['edit']);
	$UserID = $conn->real_escape_string($update->userID);
	$userType = $conn->real_escape_string($update->userType);
	$fname = $conn->real_escape_string($update->fname);
	$lname = $conn->real_escape_string($update->lname);
	$staddress = $conn->real_escape_string($update->staddress);
	$email = $conn->real_escape_string($update->email);
	$phone = $conn->real_escape_string($update->phone);
	$password = $conn->real_escape_string($update->password);

	if($password){
		$sql = "UPDATE tblUser
		SET Password = '$password', FName = '$fname', LName = '$lname', StreetAddress = '$staddress', EmailAddress='$email', Phone='$phone', FkUserCategory='$userType'
		WHERE PkID = '$UserID'";
	}
	else {
		$sql = "UPDATE tblUser
		SET FName = '$fname', LName = '$lname', StreetAddress = '$staddress', EmailAddress='$email', Phone='$phone', FkUserCategory='$userType'
		WHERE PkID = '$UserID'";
	}

	if ($conn->query($sql) === TRUE) {
		echo json_encode("Update Success");
	} else {
		echo json_encode("Error updating user info");
	}
}
$conn->close();
?>