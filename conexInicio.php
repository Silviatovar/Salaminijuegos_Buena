<?php
$valorUsuario = $_POST["username"];
$valorPassword = $_POST["password"];

$servername = "127.0.0.1";
$database = "sala_minijuegos";
$username = "root";
$password = "";

$conn = new mysqli($servername, $username, $password, $database);

// Verificar la conexión
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Utilizar consultas preparadas para evitar inyecciones de SQL
$sql = "SELECT username, contrasena FROM usuarios WHERE username = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $valorUsuario); // "s" indica que el valor es una cadena (string)
$stmt->execute();

$stmt->bind_result($usernameDB, $contrasenaDB);
$stmt->fetch();

// Verificar la contraseña utilizando la función password_verify
if ($valorUsuario == $usernameDB) {
  echo "existe";
} else {
  echo "no existe";
}

$stmt->close();
$conn->close();
?>
