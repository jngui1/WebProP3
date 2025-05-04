<?php
// allows the react client to access the php output
// TODO change origin to place of react home page for safety
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type");

// turns off all error reporting, so only json is outputted
error_reporting(0);


$json = file_get_contents("php://input");
echo $json;

// $response = array("success" => true, "message" => $content);
// echo json_encode($_POST);
