<?php
// conexGestionUsuarios.php

$servername = "127.0.0.1";
$database = "sala_minijuegos";
$username = "root";
$password = "";

$conn = new mysqli($servername, $username, $password, $database);


if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM usuarios";
$result = $conn->query($sql);

$usuarios = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $usuarios[] = $row;
    }
}

echo json_encode($usuarios);


$conn->close();
?>
