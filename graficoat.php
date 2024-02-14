<?php
$servername = "127.0.0.1";
$database = "sala_minijuegos";
$username = "root";
$password = "";

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $database);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Consulta para obtener los 5 jugadores con mayor puntuación
$sql = "SELECT username, puntos_at FROM usuarios ORDER BY puntos_at DESC LIMIT 5";
$result = $conn->query($sql);

if ($result) {
    // Obtener los resultados como un array asociativo
    $jugadores = array();
    while ($row = $result->fetch_assoc()) {
        $jugadores[] = $row;
    }

    // Convertir el array a formato JSON y añadirlo a una propiedad 'data'
    $json_result = json_encode(array('data' => $jugadores));

    // Devolver los resultados
    echo $json_result;
} else {
    echo "Error en la consulta: " . $conn->error;
}

// Cerrar la conexión
$conn->close();
?>