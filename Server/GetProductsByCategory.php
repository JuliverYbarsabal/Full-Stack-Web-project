<?php
header('Access-Control-Allow-Origin: *');

//Open the database connection
include 'DBConnection.php';

//If product category is set, return a single product
if(isset($_GET['Category'])){
	$categoryID = $_GET['Category'];
	$sql = "SELECT 
	tblProduct.PkID,
	tblProduct.Name,
	tblProduct.Description,
	tblProduct.Price,
	tblProduct.Qty,
	tblProductCategory.CategoryName
	 FROM tblProduct INNER JOIN tblProductCategory ON tblProductCategory.PkID = tblProduct.FkProductCategory WHERE FkProductCategory = $categoryID";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			$row['inCart'] = "0";
			$data[] = $row;
		}
	}

	if(isset($data)){
		echo json_encode($data);
	}
}
$conn->close(); 
?>