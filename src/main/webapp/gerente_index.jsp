<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="input" uri="http://www.springframework.org/tags/form" %>
<%@page import="com.projeto.models.Gerente"%>
<%@page import="com.projeto.rest.GerenteRest"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="pt-br">

<head>

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>DyOpe Assistant</title>

    <!-- Bootstrap core CSS-->
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom fonts for this template-->
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">

    <!-- Page level plugin CSS-->
    <link href="vendor/datatables/dataTables.bootstrap4.css" rel="stylesheet">

    <!-- Custom styles for this template-->
    <link href="css/sb-admin.css" rel="stylesheet">

    <link rel="stylesheet" href="css/estilo.css">

</head>

<body id="page-top">

<nav class="navbar navbar-expand bg-lightblue static-top">


    <a class="navbar-brand mr-1" href="gerente_index.jsp">DyOpe Assistant</a>

    <button class="btn btn-link btn-sm  order-1 order-sm-0" id="sidebarToggle" href="#">
        <i class="fas fa-bars"></i>
    </button>

    <form class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">

    </form>

    <!-- Navbar -->

    <ul class="navbar-nav ml-auto ml-md-0">
        <li class="nav-item dropdown no-arrow mx-1 show">
            <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-bell fa-fw"></i>
                <!-- Counter - Alerts -->
                <span class="badge badge-danger badge-counter">1+</span>
            </a>
            <!-- Dropdown - Alerts -->
            <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in "
                 aria-labelledby="alertsDropdown">
                <h6 class="dropdown-header">
                    Alertas
                </h6>
                <a class="dropdown-item d-flex align-items-center" href="#">
                    <div class="mr-3">
                        <div class="icon-circle bg-success">
                            <i class="fas fa- text-danger"></i>
                        </div>
                    </div>
                    <div>
                        <div class="small text-gray-500">Dezembro 7, 2019</div>
                        <span>Operação de costura foi concluida!</span>
                    </div>
                </a>

                <a class="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
            </div>
        </li>
        <li class="nav-item dropdown no-arrow">
            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-user-circle fa-fw"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                <a class="dropdown-item" href="#">Configurações</a>
                <a class="dropdown-item" href="/gerentes/perfilGerente.1">Perfil</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">Sair</a>
            </div>
        </li>
    </ul>

</nav>
<div id="wrapper">

    <!-- Sidebar -->
    <ul class="sidebar bg-primary navbar-nav">

        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-light" href="#" id="pagesDropdown" role="button"
               data-toggle="dropdown"
               aria-haspopup="false" aria-expanded="false">
                <span>Operações</span>
            </a>
            <div class="dropdown-menu" aria-labelledby="pagesDropdown" x-placement="bottom-start">
                <h6 class="dropdown-header">Tipos de Operações</h6>
                <a class="dropdown-item" href="operacao_risco.jsp">Risco</a>
                <a class="dropdown-item" href="operacao_corte.jsp">Corte</a>
                <a class="dropdown-item" href="operacao_costura.jsp">Costura</a>
                <a class="dropdown-item" href="operacao_beneficiamento.jsp">Beneficiamento</a>
                <a class="dropdown-item" href="operacao_acabamento.jsp">Acabamento</a>
            </div>
        </li>
        <li class="nav-item text-light">
            <a class="nav-link text-light" href="controle_funcionarios.jsp">
                <span>Controle</span>
            </a>

        </li>

    </ul>

    <div id="content-wrapper" class="fundo">

        <div class="container-fluid">

            <!-- Page Content -->
            <h1>Home</h1>
            <hr>

            <div class="menu_index">
                <span class="badge badge-info tam"> Bem-vindo Juan!</span>
                <span class="badge badge-info tam"> Cadastre Operações</span>
                <span class="badge badge-info tam"> Receberá informações úteis</span>
                <span class="badge badge-info tam"> Controle o andamento da produção</span>
            </div>

        </div>
        <!-- /.container-fluid -->

        <!-- Sticky Footer -->
        <footer class="sticky-footer">
            <div class="container my-auto ">
                <div class="copyright text-center my-auto ">
                    <span>Copyright © DyOpe Assistant 2018</span>
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
            <div class="modal-body">Selecione "Sair" abaixo se você estiver pronto para encerrar sua sessão atual.</div>
            <div class="modal-footer">
                <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
                <a class="btn btn-primary" href="index.jsp">Sair</a>
            </div>
        </div>
    </div>
</div>

<!-- Bootstrap core JavaScript-->
<script src="vendor/jquery/jquery.min.js"></script>
<script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

<!-- Core plugin JavaScript-->
<script src="vendor/jquery-easing/jquery.easing.min.js"></script>

<!-- Custom scripts for all pages-->
<script src="js/sb-admin.min.js"></script>

</body>

</html>
