<?php
header('Access-Control-Allow-Origin: *');
//定义变量
$factorys = array("status" => true, "factorys" => array("工厂一","工厂二"));
print_r(json_encode($factorys));

// print_r($_POST['name']);
?>