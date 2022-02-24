<?php
header('Access-Control-Allow-Origin: *');

//Open the database connection
include 'DBConnection.php';

$sql = "SELECT tblUser.PkID, tblUser.UserName, tblUser.FName, tblUser.LName, tblUser.StreetAddress, tblUser.EmailAddress, tblUser.Phone, tblUser.FkUserCategory, tblUserCategory.CategoryName FROM tblUser INNER JOIN tblUserCategory ON tblUserCategory.PkID = tblUser.FkuserCategory";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		$data['User'][] = $row;
	}
}

$sql = "SELECT * FROM tblUserCategory";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		$data['UserCategory'][] = $row;
	}
}

if(isset($data)){
	echo json_encode($data);
}

$conn->close(); 
?>