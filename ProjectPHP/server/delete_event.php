<?php
  session_start();
  if ($_SESSION['acceso'] == 'Autorizado') {
    require('conectorBD.php');

    $con = new ConectorBD('localhost', 't_general', '12345');
    $response['conexion'] = $con->initConexion('agenda_db');

    if ($response['conexion'] == 'OK') {
      if ($con->eliminarRegistro('events', 'id_event = '.$_POST['id'])) {
        $response['msg'] = 'OK';
      } else {
        $response['msg'] = 'Error al eliminar evento.';
      }
    } else {
      $response['msg'] = 'Problemas de conexión con la base de datos.';
    }

  } else {
    $response['msg'] = 'Debe iniciar sesión para visualizar agenda.';
  }

  echo json_encode($response);


 ?>
