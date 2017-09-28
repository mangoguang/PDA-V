<?php
header('Access-Control-Allow-Origin: *');
//定义变量
$factory=$_POST["factory"];

if ($factory == "工厂一") {
  $warehouses = array("status" => true, "warehouse" => array("仓库A","仓库B","仓库C"));
}else {
	$warehouses = array("status" => true, "warehouse" => array("仓库D","仓库E","仓库F"));
}
print_r(json_encode($warehouses));

// print_r($_POST['name']);
?>