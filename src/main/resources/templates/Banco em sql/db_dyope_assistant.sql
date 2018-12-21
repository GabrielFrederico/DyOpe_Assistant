-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 16-Out-2018 às 20:11
-- Versão do servidor: 5.7.17
-- PHP Version: 7.1.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projetotcc_oort`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `bairros`
--

CREATE TABLE `bairros` (
  `IDBAIRRO` int(11) NOT NULL,
  `NOME_BAI` varchar(80) NOT NULL,
  `STATUS_SYS` char(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `cidades`
--

CREATE TABLE `cidades` (
  `IDCIDADE` int(11) NOT NULL,
  `NOME_CID` varchar(80) NOT NULL,
  `STATUS_SYS` char(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `enderecos`
--

CREATE TABLE `enderecos` (
  `IDENDERECO` int(11) NOT NULL,
  `IDBAIRRO` int(11) NOT NULL,
  `IDCIDADE` int(11) NOT NULL,
  `IDTIPO_LOG` int(11) NOT NULL,
  `CEP_END` varchar(8) NOT NULL,
  `NOME_LOG_END` varchar(70) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `funcionarios`
--

CREATE TABLE `funcionarios` (
  `IDFUNCIONARIO` int(11) NOT NULL,
  `NOME_FUN` varchar(40) NOT NULL,
  `CPF_FUN` varchar(11) NOT NULL,
  `RG_FUNC` varchar(10) NOT NULL,
  `DATA_NASC_FUN` date NOT NULL,
  `DATA_ADMS_FUN` date NOT NULL,
  `EMAIL_FUN` varchar(60) DEFAULT NULL,
  `FONE_FUN` varchar(9) DEFAULT NULL,
  `IDOPERACAO` int(11) DEFAULT NULL,
  `IDENDERECO` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `gerentes`
--

CREATE TABLE `gerentes` (
  `IDGERENTE` int(11) NOT NULL,
  `NOME_GER` varchar(40) NOT NULL,
  `EMAIL_GER` varchar(50) NOT NULL,
  `CPF_GER` varchar(11) NOT NULL,
  `RG_GER` varchar(10) NOT NULL,
  `DATA_NASC_GER` date NOT NULL,
  `DATA_ADMS_GER` date NOT NULL,
  `IDENDERECO` int(11) NOT NULL,
  `IDUSUARIO` int(11) NOT NULL,
  `STATUS_SYS` char(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `operacoes`
--

CREATE TABLE `operacoes` (
  `IDOPERACAO` int(11) NOT NULL,
  `DESCRICAO_OPE` varchar(150) NOT NULL,
  `TEMPO_LIMITE_OPE` datetime NOT NULL,
  `NUM_FUNC_OPE` int(11) NOT NULL,
  `PRECO_PECA_OPE` float NOT NULL,
  `CUSTOS_OPE` float NOT NULL,
  `TEMPO_NESC_OPE` datetime NOT NULL,
  `QTD_PECA_FUNC_OPE` int(11) NOT NULL,
  `LOTE_PRODUCAO` int(11) NOT NULL,
  `STATUS_SYS` char(1) NOT NULL,
  `IDGERENTE` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tipos_logradouros`
--

CREATE TABLE `tipos_logradouros` (
  `IDTIPO_LOG` int(11) NOT NULL,
  `NOME_LOG` varchar(100) NOT NULL,
  `TIPO_LOG` varchar(35) NOT NULL,
  `STATUS_SYS` char(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `IDUSUARIO` int(11) NOT NULL,
  `NOME_USU` varchar(60) NOT NULL,
  `SENHA_USU` varchar(60) NOT NULL,
  `STATUS_SYS` char(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bairros`
--
ALTER TABLE `bairros`
  ADD PRIMARY KEY (`IDBAIRRO`);

--
-- Indexes for table `cidades`
--
ALTER TABLE `cidades`
  ADD PRIMARY KEY (`IDCIDADE`);

--
-- Indexes for table `enderecos`
--
ALTER TABLE `enderecos`
  ADD PRIMARY KEY (`IDENDERECO`);

--
-- Indexes for table `funcionarios`
--
ALTER TABLE `funcionarios`
  ADD PRIMARY KEY (`IDFUNCIONARIO`),
  ADD UNIQUE KEY `CPF_FUN` (`CPF_FUN`),
  ADD UNIQUE KEY `RG_FUNC` (`RG_FUNC`),
  ADD UNIQUE KEY `EMAIL_FUN` (`EMAIL_FUN`);

--
-- Indexes for table `gerentes`
--
ALTER TABLE `gerentes`
  ADD PRIMARY KEY (`IDGERENTE`),
  ADD UNIQUE KEY `EMAIL_GER` (`EMAIL_GER`),
  ADD UNIQUE KEY `CPF_GER` (`CPF_GER`),
  ADD UNIQUE KEY `RG_GER` (`RG_GER`);

--
-- Indexes for table `operacoes`
--
ALTER TABLE `operacoes`
  ADD PRIMARY KEY (`IDOPERACAO`);

--
-- Indexes for table `tipos_logradouros`
--
ALTER TABLE `tipos_logradouros`
  ADD PRIMARY KEY (`IDTIPO_LOG`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`IDUSUARIO`),
  ADD UNIQUE KEY `NOME_USU` (`NOME_USU`),
  ADD UNIQUE KEY `SENHA_USU` (`SENHA_USU`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `gerentes`
--
ALTER TABLE `gerentes`
  MODIFY `IDGERENTE` int(11) NOT NULL AUTO_INCREMENT;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
