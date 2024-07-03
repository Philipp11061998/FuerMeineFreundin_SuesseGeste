<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

session_start();

$config = require_once __DIR__ . '/../../config/config.php';

$conn = new mysqli($config['db_host'], $config['db_user'], $config['db_pass'], $config['db_name']);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$response = array();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT * FROM Chat");

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $response[] = $row;
        }
        $result->free();
    } else {
        $response['success'] = false;
        $response['message'] = "Fehler beim Abrufen der Nachrichten.";
    }
} else {
    $response['success'] = false;
    $response['message'] = "Ungültige Anfrage.";
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($response);
?>
