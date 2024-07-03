<?php
session_start();
require_once './config.php';

// Verbindung erstellen
$conn = new mysqli($servername, $username, $password, $dbname);

// Verbindung prüfen
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "Connected successfully";
}

header('Content-Type: application/json'); // Setze den Content-Type auf JSON

$response = array(); // Initialisiere ein leeres Array für die Antwort

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Überprüfe, ob 'message' im POST-Daten vorhanden und nicht leer ist
    if (isset($_POST['message']) && !empty(trim($_POST['message']))) {
        $message = htmlspecialchars(trim($_POST['message']), ENT_QUOTES, 'UTF-8');
        $sender = 'philipp'; // Hier dynamisch ermitteln oder aus der Session laden

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
?>
