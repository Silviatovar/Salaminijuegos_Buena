<?php
$servername = "127.0.0.1";
$database = "sala_minijuegos";
$username = "root";
$password = "";

$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST['accion'])) {
        if ($_POST['accion'] === 'registro') {
            // Registro de un nuevo usuario
            $valorUsuario = $_POST["username"];
            $valorPassword = $_POST["password"];
            $valorNombre = $_POST['nombre'];
            $valorApellidos = $_POST['apellidos'];
            $valorCorreo = $_POST['CorreoE'];
            $valorFechaNacimiento = $_POST['fechaNacimiento'];
            $valorSexo = $_POST['sexo'];

            // Asegurar que las variables sean seguras y proteger contra SQL injection
            $valorUsuario = $conn->real_escape_string($valorUsuario);
            $valorPassword = $conn->real_escape_string($valorPassword);
            $valorNombre = $conn->real_escape_string($valorNombre);
            $valorApellidos = $conn->real_escape_string($valorApellidos);
            $valorCorreo = $conn->real_escape_string($valorCorreo);
            $valorFechaNacimiento = $conn->real_escape_string($valorFechaNacimiento);
            $valorSexo = $conn->real_escape_string($valorSexo);

            $sql = "INSERT INTO usuarios (nombre, apellidos, correo, username, contrasena, fecha_nacimiento, sexo)
                    VALUES ('$valorNombre', '$valorApellidos', '$valorCorreo', '$valorUsuario', '$valorPassword', '$valorFechaNacimiento', '$valorSexo')";

            if ($conn->query($sql) === TRUE) {
                echo "USUARIO REGISTRADO CON EXITO";
            } else {
                echo "Error al registrar usuario: " . $conn->error;
            }
        } elseif ($_POST['accion'] === 'darseDeBaja') {
            // Darse de baja
            $usernameActual = $_POST['username'];

            // Asegurar que el nombre de usuario sea seguro y proteger contra SQL injection
            $usernameActual = $conn->real_escape_string($usernameActual);

            $sql = "DELETE FROM usuarios WHERE username = '$usernameActual'";

            if ($conn->query($sql) === TRUE) {
                echo 'success';
            } else {
                echo 'Error al darse de baja. Por favor, inténtalo de nuevo.';
            }
        } else {
            echo 'Acción no válida.';
        }
    } else {
        echo 'Acción no especificada.';
    }
} else {
    echo 'Método de solicitud no válido.';
}

$conn->close();
?>
