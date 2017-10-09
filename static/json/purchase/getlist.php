<?php
header('Access-Control-Allow-Origin: *');
//定义变量
$item1 = array("BUS_NO" => "4000000001","ORT01" => "广东省东莞市厚街镇双岗上环工业园慕思寝室用品有限公司","ZDDLX" => 1);
$item2 = array("BUS_NO" => "4000000002","ORT01" => "","ZDDLX" => 2);
$item3 = array("BUS_NO" => "4000000003","ORT01" => "","ZDDLX" => 3);
$Item = array("Item" => array($item1,$item2,$item3));
$orderList = array("MT_Purchase_GetInCity_Resp" => $Item);
print_r(json_encode($orderList));

// print_r($_POST['name']);
?>