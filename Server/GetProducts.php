<?php
header('Access-Control-Allow-Origin: *');

//Open the database connection
include 'DBConnection.php';

//If product ID is set, return a single product
$where_clause = "";
if(isset($_GET['ID'])){
	$ProductID = $conn->real_escape_string($_GET['ID']);
	$where_clause = "WHERE tblProduct.PkID = $ProductID";
}
$sql = "SELECT 
tblProduct.PkID,
tblProduct.Name,
tblProduct.Description,
tblProduct.Price,
tblProduct.Qty,
tblProduct.FkProductCategory,
tblProductCategory.CategoryName
 FROM tblProduct INNER JOIN tblProductCategory ON tblProductCategory.PkID = tblProduct.FkProductCategory $where_clause";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		$row['inCart'] = "0";
		$data[] = $row;
	}
}

echo json_encode($data);

$conn->close(); 
?>