<?php
// modificarUsuario.php

$servername = "127.0.0.1";
$database = "sala_minijuegos";
$username = "root";
$password = "";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    $error = array('error' => 'Error en la conexión a la base de datos.');
    header('Content-Type: application/json');
    echo json_encode($error);
    exit;
}

// Obtener los datos del usuario del cuerpo de la solicitud POST
$usuarioData = json_decode($_POST['usuarioData'], true);

// Desempaquetar datos del usuario
$nuevonombre = $usuarioData['nombre'];
$nuevosApellidos = $usuarioData['apellidos'];
$nuevoCorreo = $usuarioData['correo'];
$nuevaContrasena = $usuarioData['contrasena'];
$fechaNacimiento = $usuarioData['fecha_nacimiento'];
$sexo = $usuarioData['sexo'];
$frecuencia = $usuarioData['frecuencia'];
$dispositivos = $usuarioData['dispositivos'];
// Comprobar que el username no existe ya en la BD (exceptuando al
// usuario actual)
$username = $usuarioData['username'];
// Actualizar el usuario en la base de datos basándote en el nombre de usuario
$sql =
    "UPDATE usuarios SET nombre = '$nuevonombre', apellidos = '$nuevosApellidos', correo = '$nuevoCorreo', contrasena = '$nuevaContrasena', fecha_nacimiento = '$fechaNacimiento', sexo = '$sexo', frecuencia = '$frecuencia', dispositivos = '$dispositivos' WHERE username = '$username'";
        

$result = $conn->query($sql);

$conn->close();

header('Content-Type: application/json');
?>
