<?php
header('Access-Control-Allow-Origin: *');
//定义变量
$module1 = array("name" => "生产入库", "jurisdiction" => true, "coding" => "production", "imgurl" => './production.png');
$module2 = array("name" => "采购入库", "jurisdiction" => true, "coding" => "purchase", "imgurl" => './purchase.png');
$module3 = array("name" => "退货入库", "jurisdiction" => true, "coding" => "salesReturn", "imgurl" => './salesReturn.png');
$module4 = array("name" => "调拨入库", "jurisdiction" => true, "coding" => "allotIn", "imgurl" => './allotIn.png');
$module5 = array("name" => "调拨出库", "jurisdiction" => true, "coding" => "allotOut", "imgurl" => './allotOut.png');
$module6 = array("name" => "备货出库", "jurisdiction" => true, "coding" => "stock", "imgurl" => './stock.png');
$module7 = array("name" => "扫码查询", "jurisdiction" => true, "coding" => "scanSearch", "imgurl" => './scanSearch.png');
$module8 = array("name" => "系统设置", "jurisdiction" => true, "coding" => "setting", "imgurl" => './setting.png');
$module9 = array("name" => "仓库盘点", "jurisdiction" => false, "coding" => "check", "imgurl" => './check.png');
$module = array("status" => true, 'permissions' => array($module1, $module2, $module3, $module4, $module5, $module6, $module7, $module8, $module9));
// $factorys = array("status" => true, "factorys" => array("工厂一","工厂二"));
print_r(json_encode($module));

// print_r($_POST['name']);
?>