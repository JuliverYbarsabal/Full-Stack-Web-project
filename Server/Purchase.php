<?php
header('Access-Control-Allow-Origin: *');

//Open the database connection
include 'DBConnection.php';
if(isset($_POST['items'])){
	$items = json_decode(json_decode($_POST['items']));
	$validQty = true;
	
	foreach ($items as $item){
		$pid = $item->PkID;
		$sql = "SELECT Qty FROM tblProduct WHERE PkID=$pid";
		$result = $conn->query($sql);
		
		if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				$data[] = $row;
				if($row['Qty'] < $item->inCart){
					$validQty = false;
				}
			}
		}
	}

	if($validQty){
		foreach ($items as $item){
			$pid = $item->PkID;
			$sql = "SELECT Qty FROM tblProduct WHERE PkID=$pid";
			$result = $conn->query($sql);
			
			if ($result->num_rows > 0) {
				while($row = $result->fetch_assoc()) {
					$data[] = $row;
					$newQty = $row['Qty']-$item->inCart;
					$sql = "UPDATE tblProduct
					SET Qty = '$newQty'
					WHERE PkID=$pid";
					$conn->query($sql);
				}
			}
		}
		echo json_encode("SUCCESS");
	}
	else {
		echo json_encode("QTY ERROR");
	}
}
?>