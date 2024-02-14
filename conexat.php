<?php
$servername = "127.0.0.1";
$database = "sala_minijuegos";
$username = "root";
$password = "";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT username, puntos_at FROM usuarios ORDER BY puntos_at DESC LIMIT 5";
$result = $conn->query($sql);

if (!$result) {
    die('Error en la consulta: ' . $conn->error);
}

$usuarios = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $usuarios[] = $row;
    }
}


header('Content-Type: application/json');
echo json_encode($usuarios);

$conn->close();
?>
