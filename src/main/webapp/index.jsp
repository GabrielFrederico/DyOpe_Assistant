<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1" %>
<!DOCTYPE html>
<html lang="pt-br">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">


    <title>DyOpe Assistant</title>

    <!-- Bootstrap core CSS-->
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom fonts for this template-->
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">

    <!-- Custom styles for this template-->
    <link href="css/sb-admin.css" rel="stylesheet">
    <link href="css/estilo.css" rel="stylesheet">
    <link rel="shortcut icon" type="image/x-icon" href="imagens/iconeOpe.png"/>

</head>

<body class="bg-light">

<div class="container">

    <h1 class="titulo">DyOpe Assistant</h1>
    <div class="card card-login mx-auto mt-5">
        <div class="card-header bg-info text-light">Escolha um login:</div>
        <div class="card-body">
            <div class="form-group">
                <form method="post" action="login_gerente.jsp">
                    <input class="btn btn-primary btn-block" href="" type="submit" value="Login do Gerente">
                </form>
            </div>
            <div class="form-group">
                <form action="login_funcionario.jsp">
                    <input class="btn btn-success btn-block" type="submit" value="Login do Setor">
                </form>
            </div>

        </div>
    </div>
</div>

<!-- Bootstrap core JavaScript-->
<script src="vendor/jquery/jquery.min.js"></script>
<script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

<!-- Core plugin JavaScript-->
<script src="vendor/jquery-easing/jquery.easing.min.js"></script>

</body>

</html>
