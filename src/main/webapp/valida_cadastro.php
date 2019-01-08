<?php
require_once('conexao.php');


$cpf = isset($_POST['cpf']) ? $_POST['cpf'] : '';

$total_string_cpf = strlen($cpf);
if ($total_string_cpf != 11 && $cpf != '') {
    include_once 'cadastro.php';
    echo '<h4>CPF inválido</h4>';
}

$email_ger = $_POST['emailGer'];
$senha_ger = $_POST['senhaGer'];
$rg_ger = $_POST['rg'];
$cpf_ger = $_POST['cpf'];
$nome_ger = $_POST['nome'];

$objDB = new db();
$link = $objDB->conecta_mysql();

$sql = " insert into gerentes(NOME_GER, EMAIL_GER, RG_GER, CPF_GER ) VALUES ('$nome_ger', '$email_ger', '$rg_ger', '$cpf_ger' ) ";

if (mysqli_query($link, $sql)){
    echo 'Gerente registrado ';
}else{
    echo 'Erro ao cadastrar';
}
