<?php

    session_start();
    if ($_SESSION['acceso'] == 'Autorizado') {
      require('conectorBD.php');

      $con = new ConectorBD('localhost', 't_general', '12345');
      $response['conexion'] = $con->initConexion('agenda_db');

      if ($response['conexion'] == 'OK') {
        $resultado = $con->consultar(['events'], ['*'], 'fk_user_id = "' . $_SESSION['Login']['id_user'] . '"');

        if ($resultado->num_rows != 0) {
          $i = 0;
          while ($fila = $resultado->fetch_assoc()) {
            $event['id'] = $fila['id_event'];
            $event['title'] = $fila['titulo'];
            if ($fila['dia_completo'] == 1) {
              $event['start'] = $fila['fecha_ini'];
              $event['allDay'] = true;
            } else {
              $event['start'] = $fila['fecha_ini'].'T'.$fila['hora_ini'];
              $event['end'] = $fila['fecha_fin'].'T'.$fila['hora_fin'];
              $event['allDay'] = false;
            }
            $event['color'] = '#' . substr(str_shuffle('ABCDEF0123456789'), 0, 6);
            $response['events'][$i] = $event;
            $i++;

          } // Cierre ciclo While.
        }
        $response['msg'] = 'OK';
      } else {
        $response['msg'] = 'Problemas de conexión con la base de datos.';
      }

    } else {
      $response['msg'] = 'Debe iniciar sesión para visualizar agenda.';
    }

  echo json_encode($response);

 ?>
