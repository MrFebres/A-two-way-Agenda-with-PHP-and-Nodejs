<?php

  session_start();
  if ($_SESSION['acceso'] == 'Autorizado') {
    require('conectorBD.php');

    $con = new ConectorBD('localhost', 't_general', '12345');
    $response['conexion'] = $con->initConexion('agenda_db');

    if ($response['conexion'] == 'OK') {
      // $data['id_event'] = "";
      $data['titulo'] = '"'.$_POST['titulo'].'"';
      $data['fecha_ini'] = '"'.$_POST['start_date'].'"';

      if ($_POST['allDay'] == 'true') {
        $data['dia_completo'] = 1;
      } else {
          $data['dia_completo'] = 0;
          $data['hora_ini'] = '"'.$_POST['start_hour'].'"';
          $data['fecha_fin'] = '"'.$_POST['end_date'].'"';
          $data['hora fin'] = '"'.$_POST['end_hour'].'"';
      }
      $data['fk_user_id'] = $_SESSION['Login']['id_user'];
      // $response['msg'] = $data;

      if ($con->insertData('events', $data)) {
        $response['msg'] = 'OK';
      } else {
        $response['msg'] = 'Error al guardar evento.';
      }

    } else {
      $response['msg'] = 'Problemas de conexión con la base de datos.';
    }

  } else {
    $response['msg'] = 'Debe iniciar sesión para visualizar agenda.';
  }

  echo json_encode($response);


 ?>
