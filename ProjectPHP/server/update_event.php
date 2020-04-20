<?php
  session_start();

  if ($_SESSION['acceso'] == 'Autorizado') {
   require('conectorBD.php');

   $con = new ConectorBD('localhost', 't_general', '12345');
   $response['conexion'] = $con->initConexion('agenda_db');

   if ($response['conexion']=="OK") {
       $data['fecha_ini'] = '"'.$_POST['start_date'].'"';
       $data['hora_ini'] = '"'.$_POST['start_hour'].'"';
       $data['fecha_fin'] = '"'.$_POST['end_date'].'"';
       $data['hora_fin'] = '"'.$_POST['end_hour'].'"';

       // $response['msg'] = $data;
     if ($con->actualizarRegistro('events', $data, 'id_event= '.$_POST['id'])) {
       $response['msg'] = 'OK';
     } else {
        $response['msg'] = 'Se ha producido un error al guardar el evento "'. $_POST['id']."'";
     }
    } else {
      $response['msg'] = 'Problemas con la conexión a la base de datos';
      }
  } else {
    $response['msg']="Debe iniciar sesión";
  }

  echo json_encode($response);




 ?>
