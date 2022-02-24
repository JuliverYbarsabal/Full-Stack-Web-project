<?php
//Set MySQL database config
$server = "localhost";
$username = "root";
$password = "";
$database = "phpproject01";

//Connect to MySQL database
$conn = new mysqli($server, $username, $password, $database);

//Display error message if connection failed
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>