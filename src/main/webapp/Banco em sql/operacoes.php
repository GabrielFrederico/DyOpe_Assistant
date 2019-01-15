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
    <link href="../vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom fonts for this template-->
    <link href="../vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">

    <!-- Page level plugin CSS-->
    <link href="../vendor/datatables/dataTables.bootstrap4.css" rel="stylesheet">

    <!-- Custom styles for this template-->
    <link href="../css/sb-admin.css" rel="stylesheet">

    <link rel="stylesheet" href="../css/estilo.css">

</head>

<body id="page-top">


<nav class="navbar navbar-expand navbar-dark bg-dark sticky-top ">


    <a class="navbar-brand mr-1" href="../gerente_index.html">Página Inicial</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item ">
                <a class="nav-link" href="#"></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="../operacao_risco.html">Risco</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="../operacao_corte.html">Corte</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="../operacao_costura.html">Costura</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="../operacao_beneficiamento.html">Beneficios</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="../operacao_acabamento.html">Acabamento</a>
            </li>
        </ul>
    </div>


    <!-- Navbar Search -->
    <form class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
    </form>


    <!-- Navbar -->
    <ul class="navbar-nav ml-auto ml-md-0">
        <li class="nav-item dropdown no-arrow">
            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-user-circle fa-fw"></i>
            </a>

            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                <a class="dropdown-item" href="#">Configurações</a>
                <a class="dropdown-item" href="#">Perfil</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">Sair</a>
            </div>
        </li>
    </ul>

</nav>

<div id="wrapper">

    <!-- Sidebar -->


    <div id="content-wrapper">

        <div class="container-fluid ">

            <!-- Page Content -->

            <h1>Operações:</h1>
            <hr>

            <div class="row">
                <div class="col-sm-4">
                    <div class="card border-info mb-3 lista">
                        <div class="card-header border-info">Operações a fazer</div>
                        <div class="card-body text-secondary">
                            <a class="btn btn-outline-info list-group-item list-group-item-action ">
                                Costura
                            </a>
                            <a class="btn btn-outline-info list-group-item list-group-item-action ">
                                Beneficios
                            </a>
                        </div>
                        <div class="card-footer bg-transparent border-info">

                            <ul class="navbar-nav ml-auto ml-md-0">
                                <li class="nav-item dropdown no-arrow">
                                    <a class="nav-link dropdown-toggle btn btn-info" href="#" id="userDropdown" role="button" data-toggle="dropdown"
                                       aria-haspopup="true" aria-expanded="false">
                                        <span>Cadastrar operação</span>
                                    </a>

                                    <div class="dropdown-menu align-content-center" aria-labelledby="userDropdown">

                                        <form method="post" class="" action="cadastrar_operacoes.html">
                                            <div class="form-group">
                                                <div class="form-group">
                                                    <div class="form-label-group">
                                                        <input type="text" id="nomeCompleto" class="form-control" autofocus="autofocus"
                                                               placeholder="Nome Completo" required="required">
                                                        <label for="nomeCompleto">Nome Completo</label>
                                                    </div>
                                                </div>
                                                <div class="form-row">
                                                    <div class="col-md-6">
                                                        <div class="form-label-group">
                                                            <input type="text" name="cpf" class="form-control" placeholder="CPF"
                                                                   required="required">
                                                            <label for="cpf">CPF</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-label-group">
                                                            <input type="text" name="rg" class="form-control" placeholder="RG"
                                                                   required="required">
                                                            <label for="rg">RG</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="form-label-group">
                                                    <input type="email" name="inputEmail" class="form-control" placeholder="Endereço de e-mail"
                                                           required="required">
                                                    <label for="inputEmail">Endereço de e-mail</label>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="form-row">
                                                    <div class="col-md-6">
                                                        <div class="form-label-group">
                                                            <input type="password" name="inputPassword" class="form-control" placeholder="Senha"
                                                                   required="required">
                                                            <label for="inputPassword">Senha</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-label-group">
                                                            <input type="password" name="confirmPassword" class="form-control"
                                                                   placeholder="Confirmar senha" required="required">
                                                            <label for="confirmPassword">Confirmar senha</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <input class="btn btn-primary btn-block" type="submit" value="Cadastrar">
                                        </form>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>


                <div class="col-sm-4">
                    <div class="card border-warning mb-3 lista">
                        <div class="card-header border-warning">Operações em andamento</div>
                        <div class="card-body text-warning">
                            <a class="btn btn-outline-warning list-group-item list-group-item-action ">
                                Acabamento
                            </a>

                        </div>
                        <div class="card-footer bg-transparent border-warning">
                            <a href="../cadastro_operacoes.html" class="btn btn-outline-warning">Cadastrar</a>
                        </div>
                    </div>
                </div>

                <div class="col-sm-4">
                    <div class="card border-success mb-3 lista">
                        <div class="card-header border-success">Operações concluídas</div>
                        <div class="card-body text-success">
                            <a class="btn btn-outline-success list-group-item list-group-item-action ">
                                Risco
                            </a>

                            <a class="btn btn-outline-success list-group-item list-group-item-action ">
                                Corte
                            </a>
                        </div>
                    </div>
                </div>

            </div>

        </div>
        <!-- /.container-fluid -->

        <!-- Sticky Footer -->
        <footer class="sticky-footer">
            <div class="container my-auto">
                <div class="copyright text-center my-auto">
                    <span>Copyright © O.O.R.T 2018</span>
                </div>
            </div>
        </footer>

    </div>
    <!-- /.content-wrapper -->

</div>
<!-- /#wrapper -->

<!-- Scroll to Top Button-->
<a class="scroll-to-top rounded" href="#page-top">
    <i class="fas fa-angle-up"></i>
</a>

<!-- Logout Modal-->
<div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Pronto para sair?</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">Selecione "Sair" abaixo se você estiver pronto para encerrar sua sessão
                atual.
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
                <a class="btn btn-primary" href="../login_gerente.html">Sair</a>
            </div>
        </div>
    </div>
</div>

<!-- Bootstrap core JavaScript-->
<script src="../vendor/jquery/jquery.min.js"></script>
<script src="../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

<!-- Core plugin JavaScript-->
<script src="../vendor/jquery-easing/jquery.easing.min.js"></script>

<!-- Custom scripts for all pages-->
<script src="../js/sb-admin.min.js"></script>

</body>

</html>
