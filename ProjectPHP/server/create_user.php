<?php

  require('conectorBD.php');

  // Datos de usuario a crear
  // $id = 0;

  $con = new ConectorBD('localhost', 'test', '1234');

  if ($con->initConexion('agenda_db') == 'OK') {
    $conextion = $con->getConexion();

    $insert = $conexion->prepare('INSERT INTO users (nombre, email, clave, fecha_nacimiento VALUES (?, ? ,? ,?))');
    $birth = date('y-m-d');
    $insert->bind_param('ssss', $nombre, $email, $pass, $birth);

    $nombre= 'Freddy Febres';
    $email= 'freddyrfa@gmail.com';
    $pass= '1234';
    $birth= '1994-08-31';

    $insert->execute();

    $nombre= 'userTest';
    $email= 'usertest@email.com';
    $pass= '1234';
    $birth= '2000-08-31';

    $insert->execute();

    $con->cerrarConexion();

  } else {
    $response['msg'] = 'Se presentó un error en la conexión.'
  }

  //
  // if ($response['conexion'] == 'OK') {
  //   if ($con->newUser($nombre, $email, $pass, $fechaN)) {
  //     $response['msg']='Exito en creación de usuario';
  //   } else {
  //     $response['msg']='Error en la creación de usuario';
  //   }
  // } else {
  //   $response['msg']='No se pudo conectar a la base de datos';
  // }
  //
  // echo json_encode($response);

 ?>
