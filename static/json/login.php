<?php
header('Access-Control-Allow-Origin: *');
//定义变量
$name = $_POST["name"];
$password = $_POST["password"];

$data = array("name" => $name, "password" => $password, 'status' => 'true');
print_r(json_encode($data));

// print_r($_POST['name']);
?> 