<?php
//Set MySQL database config
$server = "localhost";
$username = "X33303336";
$password = "X33303336";
$database = "X33303336";

//Connect to MySQL database
$conn = new mysqli($server, $username, $password, $database);

//Display error message if connection failed
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>