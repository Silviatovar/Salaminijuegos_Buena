
//REGISTRO

document.addEventListener('DOMContentLoaded', function () {
    var formulario = document.getElementById('registroForm'); // Asegúrate de tener un formulario con el id 'registroForm'
    if (formulario) {
        formulario.addEventListener('submit', function (event) {
            event.preventDefault();
            if (validarFormulario()) {
                registrarUsuario();
            } else {
            
            }
        });
    }
});


    function validarFormulario() {
        var nombre = document.getElementById('nombreRegistro').value.trim();
        var apellidos = document.getElementById('apellidosRegistro').value.trim();
        var correo = document.getElementById('CorreoE').value.trim();
        var username = document.getElementById('usernameId').value.trim();
        var password = document.getElementById('passwordRegistro').value.trim();
        var confirmarPassword = document.getElementById('passwordRegistro2').value.trim();
        var fechaNacimiento = document.getElementById('fechaNacimiento').value.trim();
        var sexo = document.getElementById('sexo').value;
        // var dispositivo = document.getElementById('dispositivo').value.trim();

        // Validar longitud máxima del nombre
        if (nombre.length > 50) {
            alert('El nombre no puede tener más de 50 caracteres');
            return false;
        }
        if (apellidos.length < 2){
            alert('Los apellidos no pueden contener menos de 2 caracteres');
            return false;
        }

        // Validar formato de correo electrónico
        var correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correoRegex.test(correo)) {
            alert('Por favor, introduce una dirección de correo electrónico válida');
            return false;
        }

        // Validar que el username empiece con "@"
        if (!username.startsWith('@')) {
            alert('El nombre de usuario debe empezar con "@"');
            return false;
        }

        // Validar contraseña
        var contrasenaRegex = /^(?=.*[A-Z]).{8,}$/;
        if (!contrasenaRegex.test(password)) {
            alert('La contraseña debe tener al menos una mayúscula y ser de longitud 8 o más');
            return false;
        }

        // Validar coincidencia de contraseña y confirmación de contraseña
        if (password !== confirmarPassword) {
            alert('Las contraseñas no coinciden');
            return false;
        }

        // Validar fecha de nacimiento
        var fechaNac = new Date(fechaNacimiento);
        var fechaActual = new Date();
        if (fechaNac >= fechaActual) {  // Cambiado ">" por ">=" para permitir fechas de nacimiento iguales al día actual
            alert('La fecha de nacimiento no puede ser en el futuro o igual al día actual');
            return false;
        }

        // Validar selección de género
        if (sexo === "") {
            alert('Por favor, selecciona tu género');
            return false;
        }
        // if(dispositivo === ""){
        //     alert('Por favor, selecciona tu dispositivo');
        //     return false;
        // }

        return true;
    }

        
    function registrarUsuario() {
        var formData = $('#registroForm').serialize();

        $.ajax({
            type: 'POST',
            url: 'conex.php',
            data: formData,
            success: function (response) {
                console.log(response);
            },
            error: function (error) {
                console.log(error);
                alert('Error al procesar la solicitud.');
            }
        });
    }


    //FIN REGISTRO
    


    //INICIO SESION

    document.addEventListener('DOMContentLoaded', function () {
        var formularioInicio = document.getElementById('loginForm');

        if (formularioInicio) {
            formularioInicio.addEventListener('submit', function (event) {
                event.preventDefault();

                if (validarFormularioInicio()) {
                   
                    verificarUsuario().then(function (response) {
                      
                        try {
                            if (response) {
                                 var usernameValue = document.getElementById('usernameInicio').value.trim();
                                localStorage.setItem('username', usernameValue);
                                mostrarNombreUsuarioEnHeader(usernameValue);
                                mostrarNav();
                                alert("Bienvenid@ " + usernameValue + "!");
                                if (usernameValue !== '@admin') {
                                    $("#tabgestion").hide();
                                    $("#tabadmin").hide();
                                } else {
                                    $("#tabgestion").show();
                                    $("#tabadmin").show();
                                }
                            } else {
                                alert("Usuario no encontrado");
                            }
                            
                        } catch (error) {
                            console.log("error")
                        }
                    });
                   
                }
            });
        }
    });


    function validarFormularioInicio() {
        var username = document.getElementById('usernameInicio').value.trim();
        var password = document.getElementById('passwordInicio').value.trim();
        if (!username.startsWith('@')) {
            alert('El nombre de usuario debe empezar con "@"');
            return false;
        }  
         var contrasenaRegex = /^(?=.*[A-Z]).{8,}$/;
        if (!contrasenaRegex.test(password)) {
            alert('La contraseña debe tener al menos una mayúscula y ser de longitud 8 o más');
            return false;
        }
        return true;
    }


    function cerrarSesion() {
       
        localStorage.removeItem('username');
    
        // Cerrar el menú desplegable 
        var menuDesplegable = document.getElementById('userDropdown');
        if (menuDesplegable) {
            var instanciaMenu = bootstrap.Dropdown.getInstance(menuDesplegable);
            if (instanciaMenu) {
                instanciaMenu.hide();
            }
        }
  
        mostrarNombreUsuarioEnHeader("");
    
        ocultarElementosEnCierreSesion();
    }
    
    function ocultarElementosEnCierreSesion() {
        var elementosParaOcultar = document.querySelectorAll('.hide-on-logout');
        elementosParaOcultar.forEach(function (elemento) {
            elemento.style.display = 'none';
        });
    
        var elementosParaMostrar = document.querySelectorAll('.show-on-logout');
        elementosParaMostrar.forEach(function (elemento) {
            elemento.style.display = 'block';
        });
    }
    

    function mostrarNombreUsuarioEnHeader(username) {
        var usernameDisplay = document.getElementById('usernameDisplay');

        if (username) {
            usernameDisplay.textContent = username;
        } else {
            usernameDisplay.textContent = '  ';
        }
    }
    function verificarUsuario() {
        return new Promise((resolve, reject) => {
            var username = $("#usernameInicio").val();
            var password = $("#passwordInicio").val();
            $.ajax({
                type: 'POST',
                url: 'conexInicio.php',
                data: {username: username, password: password},
                success: function (response) {
                    
                    if (response === 'existe') {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                },
                error: function (xhr, status, error) {
                    console.log(xhr.responseText);
                    alert('Error al procesar la solicitud. Detalles: ' + xhr.responseText);
                    resolve(false);
                }
            });
        })
       
    }

    // Inicializar el nombre de usuario 
    mostrarNombreUsuarioEnHeader(localStorage.getItem('username'));

    function mostrarNav(username) {
        var tabs = document.querySelectorAll('.tablinks');
    
        tabs.forEach(function (tab) {
            if (username) {
                tab.style.display = 'block'; 
            } else {
                if (tab.classList.contains('hide-on-logout')) {
                    tab.style.display = 'block'; 
                }
            }
        });
    }

    function setearUsername() {
        $("#valorUsername").val($('#usernameDisplay').text());
        rellenarFormulario( $("#valorUsername").val());
    }

    function modificarUsuarioTabla(username) {
        rellenarFormulario(username);
        $('#modifyUserModal').modal('show');
        $("#valorUsername").val(username);

    }

    function modificarUsuario() {
        // Obtener los valores de los campos del formulario
        var username = $("#valorUsername").val();
        var nuevoNombre = $('#newname').val();
        var nuevosApellidos = $('#newapellidos').val();
        var nuevoCorreo = $('#newEmail').val();
        var nuevoUsername = $('#modifyUsername').val();
        var nuevaContraseña = $('#newPassword').val();
        var confirmarNuevaContraseña = $('#newconfirmNewPassword').val();
        var nuevaFechaNacimiento = $('#newfechaNacimiento').val();
        var nuevoSexo = $('#newsexo').val();
        var ordenadorSeleccionado = $('#ordenador').prop('checked');
        var movilSeleccionado = $('#movil').prop('checked');
        var frecuenciaSeleccionada = $('input[name="newfrecuencia"]:checked').val();
        
        // Crear un objeto con los datos del usuario
        var usuarioData = {
            nombre: nuevoNombre,
            apellidos: nuevosApellidos,
            correo: nuevoCorreo,
            username: nuevoUsername,
            contrasena: nuevaContraseña,
            confirmarContrasena: confirmarNuevaContraseña,
            fecha_nacimiento: nuevaFechaNacimiento,
            sexo: nuevoSexo,
            dispositivos: {
                ordenador: ordenadorSeleccionado,
                movil: movilSeleccionado
            },
            frecuencia: frecuenciaSeleccionada,
            username: username
        };

        console.log(usuarioData);
    
        // Realizar la solicitud AJAX
        $.ajax({
            type: 'POST',
            url: 'conexGetionDatos.php', // Ajusta la URL según tu estructura
            dataType: 'json',
            data: { usuarioData: JSON.stringify(usuarioData) },
            error: function (response) {
                // Manejar la respuesta del servidor
                alert("Modificado Correctamente!");
                cargarTablaUsuarios()
            },
        });
    }
    
    //FIN MODIFICAR USUARIO

    // DARSE DE BAJA 

    function confirmarDarseDeBaja() {
        var confirmacion = confirm('¿Estas seguro de que deseas darte de baja?');
        if (confirmacion) {
            darseDeBaja();
        }
    }
    
    function confirmarDarseDeBaja1() {
        var confirmacion = confirm('¿Estas seguro de que deseas darte de baja?');
        if (confirmacion) {
            darseDeBaja();
        }
    }
    function darseDeBaja() {
        var usernameActual = localStorage.getItem('username');
    
        $.ajax({
            type: 'POST',
            url: 'conex.php',
            data: { 
                accion: 'darseDeBaja', 
                username: usernameActual 
            },
            success: function (response) {
                if (response === 'success') {
                    alert("Usuario dado de baja correctamente. Se ha cerrado tu cuenta: " + usernameActual);
                    cerrarSesion();
                } else {
                    alert(response); 
                }
            },
            error: function (error) {
                console.log(error);
                alert('Error al procesar la solicitud.');
            }
        });
    }
    
    //CONSULTAR TABLA PUNTOS

    $(document).ready(function () {
        $('#btnConsultarPuntosAT').on('click', function () {
            $.ajax({
                type: 'GET',
                url: 'conexat.php',
                dataType: 'json',
                success: function (data) {
                    $('#tablaPuntosAT tbody').empty();
    
                    for (var i = 0; i < data.length; i++) {
                        var row = '<tr><td>' + data[i].username + '</td><td>' + data[i].puntos_at + '</td></tr>';
                        $('#tablaPuntosAT tbody').append(row);
                    }
                },
                error: function (xhr, status, error) {
                    console.log(xhr.responseText);
                    alert('Error al procesar la solicitud. Detalles: ' + xhr.responseText);
       
                }
            });
        });
    });
    

    //FIN INICIO

    function cargarTablaUsuarios() {
        $.ajax({
            type: 'GET',
            url: 'conexGestionUsuarios.php',
            dataType: 'json',
            success: function (data) {
                // Limpiar la tabla antes de cargar nuevos datos
               if( document.getElementById('tablaUsuarios')){
                     $('#tablaUsuarios').DataTable().clear().destroy();
    
                // Construir la tabla utilizando DataTables
                $('#tablaUsuarios').DataTable({
                    data: data,
                    columns: [
                        { data: 'nombre', title: 'Nombre' },
                        { data: 'apellidos', title: 'Apellidos'},
                        { data: 'correo' , title: 'Correo'},
                        { data: 'username',title: 'Username'},
                        { data: 'fecha_nacimiento', title: 'Fecha de nacimiento'},
                        { data: 'contrasena', title: 'Contraseña'},
                        { data: 'sexo', title: 'Sexo' },
                        {
                            data: 'acciones',
                            title: '',
                            render: function (data, type, row) {
                                return '<button onclick="modificarUsuarioTabla(\'' + row.username + '\')">Modificar</button>' +
                                    '<button onclick="eliminarUsuario(\'' + row.username + '\')">Eliminar</button>';
                            }
                        }
                    ]
                });
               }
           
            },
            error: function (xhr, status, error) {
                console.log(xhr.responseText);
                alert('Error al cargar la tabla de usuarios. Detalles: ' + xhr.responseText);
            }
        });
    }
    
    // Llamar a la función cuando la página esté lista
    $(document).ready(function () {
        cargarTablaUsuarios();
    });

    function eliminarUsuario(username) {
        var confirmacion = confirm('¿Estas seguro de que deseas eliminar el usuario ' + username + '?');

        if (confirmacion) {
            $.ajax({
                type: 'POST',
                url: 'conex.php',
                data: { accion: 'darseDeBaja', username: username },
                success: function (respuesta) {
                    alert('Usuario eliminado correctamente');
                    cargarTablaUsuarios();
                },
                error: function (xhr, status, error) {
                    console.log(xhr.responseText);
                    alert('Error al eliminar el usuario. Detalles: ' + xhr.responseText);
                }
            });

        }

    }

    function rellenarFormulario(username) {
        var username = username ?? $('#usernameDisplay').text();

        $.ajax({
            type: 'GET',
            url: 'conexObtenerUsuario.php',
            data: { username: username },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                $('#newname').val(data.nombre);
                $('#newapellidos').val(data.apellidos);
                $('#newEmail').val(data.correo);
                $('#modifyUsername').val(data.username);
                $('#newPassword').val(data.contrasena);
                $('#newconfirmNewPassword').val(data.contrasena);
                $('#newfechaNacimiento').val(data.fecha_nacimiento);
                $('#newsexo').val(data.sexo);
                $('#ordenador').prop('checked', data.dispositivos.ordenador);
                $('#movil').prop('checked', data.dispositivos.movil);
                $('input[name=opciones][value=' + data.frecuencia + ']').prop('checked', true);
            },
            error: function (xhr, status, error) {
                console.log(xhr.responseText);
                alert('Error al cargar los datos del usuario. Detalles: ' + xhr.responseText);
            }
        });
    }

    


    //INICIO ADMINISTRACION JSON
    // Función para cargar y mostrar los datos del juego seleccionado
    window.onload = function () {
        const tipoJuegoElement = document.getElementById('tipoJuego');
        console.log(tipoJuegoElement);
        if (tipoJuegoElement) {
            tipoJuegoElement.addEventListener('change', function () {
                const tipoJuego = this.value;
                fetch('admin.json')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error al cargar el archivo JSON');
                        }
                        return response.json();
                    })
                    .then(data => {
                        const tbody = document.getElementById('tbodyDatos');
                        tbody.innerHTML = ''; 
                        data.juegos[tipoJuego].forEach(juego => {
                            const row = document.createElement('tr');
                            row.innerHTML = `
                            <td>${juego.nombre}</td>
                            <td>${juego.categoria}</td>
                            <td>${juego.edad_recomendada}</td>
                            <td>
                                <ul>
                                ${juego.jugadores.map(jugador => `<li>${jugador.nombre} (${jugador.edad} años, ${jugador.puntos} puntos)</li>`).join('')}
                                </ul>
                            </td>
                        `;
                            tbody.appendChild(row);
                        });
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            });
        }
    }
    
    