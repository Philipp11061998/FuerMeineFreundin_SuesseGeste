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

$conn->begin_transaction();

try {
    // Schritt 1: Abrufen aller IDs und Pfade
    $sql = "SELECT id, path FROM images";
    $result = $conn->query($sql);

    $data = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    } else {
        throw new Exception("Keine Einträge gefunden");
    }

    // Schritt 2: Shuffeln der Daten
    shuffle($data);

    // Schritt 3: Temporäre Tabelle erstellen
    $sql_create_temp_table = "
        CREATE TEMPORARY TABLE temp_table (
            id INT PRIMARY KEY,
            path VARCHAR(255)
        )
    ";
    $conn->query($sql_create_temp_table);

    // Schritt 4: Daten in die temporäre Tabelle einfügen
    $new_id = 1;
    foreach ($data as $row) {
        $path = $row['path'];
        $sql_insert_temp = "INSERT INTO temp_table (id, path) VALUES ($new_id, '$path')";
        $conn->query($sql_insert_temp);
        $new_id++;
    }

    // Schritt 5: Leeren der Originaltabelle
    $sql_truncate_original = "TRUNCATE TABLE images";
    $conn->query($sql_truncate_original);

    // Schritt 6: Daten aus der temporären Tabelle in die Originaltabelle kopieren
    $sql_copy_back = "INSERT INTO images (id, path) SELECT id, path FROM temp_table";
    $conn->query($sql_copy_back);

    $conn->commit();

    echo "Einträge erfolgreich geshuffelt";
} catch (Exception $e) {
    $conn->rollback();
    echo "Fehler: " . $e->getMessage();
}

// Verbindung schließen
$conn->close();
?>