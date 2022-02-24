<?php
header('Access-Control-Allow-Origin: *');

//Open the database connection
include 'DBConnection.php';

if(isset($_POST['user'])){
	$UserID = json_decode($_POST['user']);

	$sql = "SELECT tblUser.PkID, tblUser.UserName, tblUser.FName, tblUser.LName, tblUser.StreetAddress, tblUser.EmailAddress, tblUser.Phone, tblUser.FkUserCategory, tblUserCategory.CategoryName FROM tblUser INNER JOIN tblUserCategory ON tblUserCategory.PkID = tblUser.FkuserCategory WHERE tblUser.PkID = $UserID";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			$data[] = $row;
		}
	}

	if(isset($data)){
		echo json_encode($data[0]);
	}
}
$conn->close(); 
?>