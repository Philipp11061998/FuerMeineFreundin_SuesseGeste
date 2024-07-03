<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

session_start();

// Einbinden der Konfigurationsdatei
$config = require_once __DIR__ . '/../../config/config.php';  // Pfad zur config.php anpassen

// Verbindung erstellen
$conn = new mysqli($config['db_host'], $config['db_user'], $config['db_pass'], $config['db_name']);

// Verbindung prüfen
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "Connected successfully";  // Optional: Hier könnte eine Erfolgsmeldung ausgegeben werden
}

$response = array(); // Initialisiere ein leeres Array für die Antwort

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Überprüfe, ob 'message' im POST-Daten vorhanden und nicht leer ist
    if (isset($_POST['message']) && !empty(trim($_POST['message']))) {
        $message = htmlspecialchars(trim($_POST['message']), ENT_QUOTES, 'UTF-8');
        $sender = 'jasminibini'; // Hier dynamisch ermitteln oder aus der Session laden

        // SQL-Query vorbereiten
        $sql = "INSERT INTO Chat (sender, messagetext) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);

        // Parameter binden und ausführen
        $stmt->bind_param("ss", $sender, $message);
        if ($stmt->execute()) {
            $response['success'] = true;
            $response['message'] = "Nachricht erfolgreich gesendet.";
        } else {
            error_log("Fehler beim Ausführen der SQL-Abfrage: " . $stmt->error);
            $response['success'] = false;
            $response['message'] = "Fehler beim Senden der Nachricht.";
        }
        $stmt->close();
    } else {
        $response['success'] = false;
        $response['message'] = "Nachricht ist erforderlich.";
    }
} else {
    $response['success'] = false;
    $response['message'] = "Ungültige Anfrage.";
}

$conn->close();

echo json_encode($response); // Gebe die Antwort als JSON zurück
