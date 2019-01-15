<?php

class db
{
    private $servername = '127.0.0.1';
    private $database = 'db_dyopeassistant';
    private $username = 'root';
    private $password = 'admin';

    public function conecta_mysql()
    {
        $connect = mysqli_connect($this->servername, $this->username, $this->password, $this->database);

        mysqli_set_charset($connect, 'utf8');

        if (mysqli_connect_errno()) {
            echo 'Erro ao se conectar com Banco de dados: ' . mysqli_connect_error();
        }
        return $connect;

    }


}
