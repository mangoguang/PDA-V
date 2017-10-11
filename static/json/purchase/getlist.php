<?php
header('Access-Control-Allow-Origin: *');
//定义变量
$item1 = array("BUS_NO" => "4000000001","ORT01" => "广东省东莞市厚街镇双岗上环工业园慕思寝室用品有限公司","ZDDLX" => 1);
$item2 = array("BUS_NO" => "4000000002","ORT01" => "","ZDDLX" => 2);
$item3 = array("BUS_NO" => "4000000003","ORT01" => "","ZDDLX" => 3);
$item4 = array("BUS_NO" => "4000000004","ORT01" => "","ZDDLX" => 4);
$item5 = array("BUS_NO" => "4000000005","ORT01" => "","ZDDLX" => 5);
$item6 = array("BUS_NO" => "4000000006","ORT01" => "","ZDDLX" => 6);
$item7 = array("BUS_NO" => "4000000007","ORT01" => "","ZDDLX" => 7);
$item8 = array("BUS_NO" => "4000000008","ORT01" => "","ZDDLX" => 8);
$item9 = array("BUS_NO" => "4000000009","ORT01" => "","ZDDLX" => 9);
$item10 = array("BUS_NO" => "40000000010","ORT01" => "","ZDDLX" => 10);
$item11 = array("BUS_NO" => "40000000011","ORT01" => "","ZDDLX" => 11);
$item12 = array("BUS_NO" => "40000000012","ORT01" => "","ZDDLX" => 12);
$item13 = array("BUS_NO" => "40000000013","ORT01" => "","ZDDLX" => 13);
$Item = array("Item" => array($item1,$item2,$item3,$item4,$item5,$item6,$item7,$item8,$item9,$item10,$item11,$item12,$item13));
$orderList = array("MT_Purchase_GetInCity_Resp" => $Item);
print_r(json_encode($orderList));

// print_r($_POST['name']);
?>