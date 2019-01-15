<?php
require_once('db.class.html');

$cpf = isset($_POST['cpf']) ? $_POST['cpf'] : '';

$total_string_cpf = strlen($cpf);
if ($total_string_cpf != 11 && $cpf != '') {
    include_once 'cadastro.html';
    echo '<h4>CPF inválido</h4>';
}

$email = $_POST['emailGer'];
$senha = $_POST['senhaGer'];
$rg_ger = $_POST['rg'];
$cpf_ger = $_POST['cpf'];
$nome_ger = $_POST['nome'];
$ID = 4;

$objDB = new db();
$link = $objDB->conecta_mysql();

$sql = "INSERT INTO usuarios (NOME_USU, SENHA_USU, STATUS_SYS, IDUSUARIO) VALUES ( ' $email', '$senha', 'A', '$ID' )";

if (mysqli_query($link, $sql)){
    echo 'Gerente registrado com sucesso ';
    header("location: login_gerente.html");
}else{
    echo 'Erro ao cadastrar';
}

mysqli_close($link);