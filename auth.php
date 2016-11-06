<?php
  $bdd = array(
    'alex' => "alex",
    'alexis' => 'buon',
    'luc' => 'marie',
    'nicolas' => 'filliard',
    'nicolas' => 'pertays'
  );

  foreach($bdd as $loginBDD => $pwdBDD){
    $login = $_POST['login'];
    $pwd = $_POST['pwd'];

    if(isset($login) && isset($pwd)) {
      if($login == $loginBDD && $pwd == $pwdBDD) {
        session_start();
        $_SESSION['user'] = $login;
        echo json_encode(array("status" => true));
      } else {
        if($login != $loginBDD)
          echo json_encode(array("status" => false, "e" => "login"));
        if($pwd != $pwdBDD)
          echo json_encode(array("status" => false, "e" => "pwd"));
      }
    } else {
      echo json_encode(array("status" => false));
    }
  }
?>
