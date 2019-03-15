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

    <title>Operações</title>

    <!-- Bootstrap core CSS-->
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom fonts for this template-->
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">

    <!-- Custom styles for this template-->
    <link href="css/sb-admin.css" rel="stylesheet">
    <link href="css/estilo.css" rel="stylesheet">

</head>

<body class="bg-secondary">

<div class="container">
    <div class="card card-register mx-auto mt-5">
        <div class="card-header bg-info text-light">Cadastro de operação</div>
        <div class="card-body">
            <form method="post" action="operacoes/cadastraroperacao">
                <div class="form-group">
                    <div class="form-group">

                        <label for="DescricaoOpe">Descrição da operação:</label>
                        <textarea required="required" class="form-control" rows="2" id="DescricaoOpe"></textarea>
                    </div>
                    <div class="form-group">
                        <div class="form-row">
                            <div class="col-md-6">
                                <div class="form-label-group">
                                    <input type="date" id="datainicio" class="form-control"
                                           placeholder="Data Inicio:"
                                           required="required">
                                    <label for="datainicio">Data Inicio:</label>
                                </div>
                            </div>


                            <div class="col-md-6">
                                <div class="form-label-group">
                                    <input type="date" id="datalimite" class="form-control"
                                           placeholder="Data limite:"
                                           required="required">
                                    <label for="datalimite">Data limite:</label>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="form-row">
                        <div class="col-md-6">
                            <div class="form-label-group">
                                <input type="text" id="custosOpe" class="form-control fa-credit-card"
                                       placeholder="Custos"
                                       required="required">
                                <label for="custosOpe">Custos:</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-label-group">
                                <input type="number" id="LoteProd" class="form-control"
                                       placeholder="Lote de Produção"
                                       required="required">
                                <label for="LoteProd">Lote de Produção:</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-12">
                    <button onclick="history.go(-1)" class="btn btn-primary">Cancelar</button>
                    <input class="btn btn-primary" type="submit" value="Cadastrar">
                </div>
            </form>
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
