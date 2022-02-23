<?php
header('Access-Control-Allow-Origin: *');
if(!isset($_GET['SID'])){
	exit(0);
}
session_id($_GET['SID']);
session_start();
//Return the data for the current user
if(isset($_SESSION['AuthUser'])){
	$user = $_SESSION['AuthUser'];
	echo json_encode($user);
}
else {
	echo json_encode(0);
}
?>