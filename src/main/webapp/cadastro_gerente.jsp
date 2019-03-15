<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
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

    <title>Cadastro</title>

    <!-- Bootstrap core CSS-->
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom fonts for this template-->
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">

    <!-- Custom styles for this template-->
    <link href="css/sb-admin.css" rel="stylesheet">

    <link rel="stylesheet" href="css/estilo.css">

</head>

<body class="bg-lightblue">

<div class="container">
    <div class="card card-register mx-auto mt-5">
        <div class="card-header bg-info text-light">Cadastro</div>
        <div class="card-body">
            <form:form method="post" action="/gerentes/cadastrargerente"  modelAttribute="gerente">

                <div class="form-group">
                    <div class="form-row">
                        <div class="col-md-6">
                            <div class="form-label-group">
                                <input type="text" name="nome" id="nomeCompleto" class="form-control"
                                       autofocus="autofocus"
                                       placeholder="Nome Completo" required="required">
                                <label for="nomeCompleto">Nome Completo</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-label-group">
                                <input type="text" name="nomeUsuario" id="nomeUser" class="form-control"
                                       autofocus="autofocus"
                                       placeholder="Nome Completo" required="required">
                                <label for="nomeUser">Nome de usuario</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-row">
                        <div class="col-md-6">
                            <div class="form-label-group">
                                <input type="text" name="cpf" id="cpf" class="form-control" placeholder="CPF"
                                       required="required">
                                <label for="cpf">CPF</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-label-group">
                                <input type="text" name="rg" id="rg" class="form-control" placeholder="RG"
                                       required="required">
                                <label for="rg">RG</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <div class="form-label-group">
                        <input type="email" name="email" id="inputEmail" class="form-control"
                               placeholder="Endere�o de e-mail"
                               required="required">
                        <label for="inputEmail">Endere�o de e-mail</label>
                    </div>
                </div>
                <div class="form-group">
                    <div class="form-row">
                        <div class="col-md-6">
                            <div class="form-label-group">
                                <input type="password" name="senha" id="inputPassword" class="form-control"
                                       placeholder="Senha"
                                       required="required">
                                <label for="inputPassword">Senha</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-label-group">
                                <input type="password" name="senhaConfirm" id="confirmPassword" class="form-control"
                                       placeholder="Confirmar senha" required="required">
                                <label for="confirmPassword">Confirmar senha</label>
                            </div>
                        </div>
                    </div>
                </div>
                <input class="btn btn-info btn-block" type="submit" value="Cadastrar">
            </form:form>
            <div class="text-center">
                <a class="d-block small mt-3" href="index.jsp">P�gina de login</a>
                <a class="d-block small" href="forgot-password.jsp">Esqueceu a senha?</a>
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
