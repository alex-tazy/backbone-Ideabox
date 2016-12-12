<?php
$login = $_POST['login'];
$pwd = $_POST['pwd'];

$pdo = new PDO("mysql:dbname=testbackbone;host=localhost", "root", "");
$sql = "SELECT * FROM users WHERE prenom = :login AND nom = :pwd";
$statement = $pdo->prepare($sql);
$statement->bindParam(':login', $login);
$statement->bindParam(':pwd', $pwd);
$statement->execute();
$results = $statement->fetchAll(PDO::FETCH_ASSOC);
if (count($results) > 0) {
    session_start();
    $_SESSION['user'] = $login;
    echo json_encode(array("status" => true));
} else {
    echo json_encode(array("status" => false));
}

?>
