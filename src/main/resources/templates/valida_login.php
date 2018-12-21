
<?php
require_once ("funcoes_valida_login.php");

$email_usuario = $_POST['Email'];
$senha_usuario = $_POST['Password'];

$usuario_validado = valida_login($email_usuario,$senha_usuario);

if ($usuario_validado){
    include_once "logado.php";
}else{
    include_once "login.php";
    echo '<h2>Usuário ou senha inválidos!<h2>';
}