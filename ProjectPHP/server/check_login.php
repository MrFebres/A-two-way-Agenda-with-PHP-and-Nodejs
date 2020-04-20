<?php

  session_start(); // Método para creación o reanudación de sesión.

  require('conectorBD.php');

  // $id = 0;
  $email = $_POST['username'];
  $clave = $_POST['password'];
  $response['conexion'] = 'Sin conexión';

  $con = new ConectorBD('localhost', 't_general', '12345');
  $response['conexion'] = $con->initConexion('agenda_db');

  if ($response['conexion'] == 'OK') {
    $resultado = $con->consultar(['users'], ['*'], 'email = "' . $email . '"');
    // $response['msg'] = $resultado->fetch_assoc();

    if ($resultado->num_rows != 0) {
      $fila = $resultado->fetch_assoc();
      $userResult = $fila;

      if ($clave === $fila['clave']) {
        $_SESSION['acceso'] = 'Autorizado'; // Variable global de sesión.
        $_SESSION['Login'] = $userResult;
        $response['msg'] = 'OK';
      } else {
        $response['msg'] = 'Contraseña incorrecta';
        // $response['msg'] = $clave;
        }


    } else {
      $response['msg'] = 'El usuario no existe';
      // $response['msg'] = $resultado;
    }
  } else {
    $con->cerrarConexion();
  }


echo json_encode($response); // Respuesta formato json enviado al cliente como 'php_response'

?>
