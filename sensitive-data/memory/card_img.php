<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

session_start();

// Lade die Konfigurationsdatei für die Datenbankverbindung
$config = require_once __DIR__ . '/../../../config/config.php';

// Verbindung zur Datenbank herstellen
$conn = new mysqli($config['db_host'], $config['db_user'], $config['db_pass'], $config['db_name']);

// Überprüfe die Verbindung
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$response = array();

$result = $conn->query("SELECT * FROM images");

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $response[] = $row;
        }
        $result->free();
    }


// Verbindung schließen
$conn->close();

header('Content-Type: application/json');
echo json_encode($response);
?>