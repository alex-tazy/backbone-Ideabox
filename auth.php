<?php
  $loginBDD = "alex";
  $pwdBDD = "alex";

  $login = $_POST['login'];
  $pwd = $_POST['pwd'];

  if(isset($login) && isset($pwd)) {
    if($login == $loginBDD && $pwd == $pwdBDD) {
      echo json_encode(array('message' => 'Bienvenue', "status" => "ok"));
    } else {
      echo json_encode(array("message" => "Erreur de pwd ou de login", "status" => "nope"));
    }
  } else {
    echo json_encode(array("message" => "Champs Vides - Erreur", "status" => "nope"));
  }
 ?>
