<link rel="stylesheet" href="css/estilo.css">
<?php
require_once("funcoes_valida_login.html");

$email_usuario = $_POST['Email'];
$senha_usuario = $_POST['Password'];
$usuario_validado = valida_login($email_usuario, $senha_usuario);

    if($usuario_validado){
        header("location: gerente_index.html");
    } else {
        include_once "login_gerente.html";
        echo '<h2 class="loginInvalido">E-mail ou senha inválidos!<h2>';
    }