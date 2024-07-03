<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

session_start();

// Lade die Konfigurationsdatei für die Datenbankverbindung
$config = require_once __DIR__ . '/../../config/config.php';

// Verbindung zur Datenbank herstellen
$conn = new mysqli($config['db_host'], $config['db_user'], $config['db_pass'], $config['db_name']);

// Überprüfe die Verbindung
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL-Abfrage zum Abrufen des Passworts
$sql = "SELECT password FROM Passwords WHERE id = 1"; // Annahme: Das Passwort ist in Zeile 1

$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $adminPassword = $row["password"];

    // Setze den Content-Type auf JSON
    header('Content-Type: application/json');

    // Ausgabe des Passworts als JSON für die AJAX-Anfrage
    echo json_encode(array('adminPassword' => $adminPassword));
} else {
    // Fehlermeldung, falls kein Passwort gefunden wurde
    echo json_encode(array('error' => 'Kein Passwort gefunden'));
}

$conn->close();
?>
