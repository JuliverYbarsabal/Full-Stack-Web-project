<?php
header('Access-Control-Allow-Origin: *');
session_start();
//Open the database connection
include 'DBConnection.php';

//Login user
if(isset($_POST['login'])){
	$login = json_decode($_POST['login']);
	$username = $conn->real_escape_string($login->username);
	$password = $conn->real_escape_string($login->password);
	$sql = "SELECT tblUser.PkID AS UserID, tblUserCategory.PkID AS UserType FROM tblUser INNER JOIN tblUserCategory ON tblUserCategory.PkID = tblUser.FkuserCategory WHERE username = '$username' AND password = '$password'";
	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()){
			$data[] = $row;
		}
	}
	if(isset($data)){
		$user['UserType'] = $data[0]['UserType'];
		$user['UserID'] = $data[0]['UserID'];
		$_SESSION['AuthUser'] = $user;

		echo json_encode(session_id());
	}
	else {
		echo json_encode(0);
	}
}
$conn->close();
?>