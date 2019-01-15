-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------

CREATE SCHEMA IF NOT EXISTS `db_dyopeassistant` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;


-- -----------------------------------------------------
-- Table `dyope_assistant`.`bairros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_dyopeassistant`.`bairros` (
  `IDBAIRRO` INT(11) NOT NULL,
  `NOME_BAI` VARCHAR(80) NOT NULL,
  `STATUS_SYS` CHAR(1) NOT NULL,
  PRIMARY KEY (`IDBAIRRO`))
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8;

use `db_dyopeassistant`;

-- -----------------------------------------------------
-- Table .`cidades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cidades` (
  `IDCIDADE` INT NOT NULL,
  `NOME_CID` VARCHAR(80) NOT NULL,
  `STATUS_SYS` CHAR(1) NOT NULL,
  PRIMARY KEY (`IDCIDADE`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `dyope_assistant`.`enderecos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `enderecos` (
  `IDENDERECO` INT(11) NOT NULL,
  `IDBAIRRO` INT(11) NOT NULL,
  `IDCIDADE` INT(11) NOT NULL,
  `IDTIPO_LOG` INT(11) NOT NULL,
  `CEP_END` VARCHAR(8) NOT NULL,
  `NOME_LOG_END` VARCHAR(70) NOT NULL,
  PRIMARY KEY (`IDENDERECO`))
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `dyope_assistant`.`funcionarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `funcionarios` (
  `IDFUNCIONARIO` INT(11) NOT NULL,
  `NOME_FUN` VARCHAR(40) NOT NULL,
  `CPF_FUN` VARCHAR(11) NOT NULL,
  `RG_FUNC` VARCHAR(10) NOT NULL,
  `DATA_NASC_FUN` DATE NOT NULL,
  `DATA_ADMS_FUN` DATE NOT NULL,
  `EMAIL_FUN` VARCHAR(60) NULL DEFAULT NULL,
  `FONE_FUN` VARCHAR(9) NULL DEFAULT NULL,
  `IDOPERACAO` INT(11) NULL DEFAULT NULL,
  `IDENDERECO` INT(11) NOT NULL)
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `dyope_assistant`.`gerentes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gerentes` (
  `IDGERENTE` INT(11) NOT NULL,
  `NOME_GER` VARCHAR(40) NOT NULL,
  `EMAIL_GER` VARCHAR(50) NOT NULL,
  `CPF_GER` VARCHAR(11) NOT NULL,
  `RG_GER` VARCHAR(10) NOT NULL,
  `DATA_NASC_GER` DATE NOT NULL,
  `DATA_ADMS_GER` DATE NOT NULL,
  `IDENDERECO` INT(11) NOT NULL,
  `IDUSUARIO` INT(11) NOT NULL,
  `STATUS_SYS` CHAR(1) NOT NULL,
  PRIMARY KEY (`IDGERENTE`),
  UNIQUE INDEX `EMAIL_GER` (`EMAIL_GER` ASC) VISIBLE,
  UNIQUE INDEX `CPF_GER` (`CPF_GER` ASC) VISIBLE,
  UNIQUE INDEX `RG_GER` (`RG_GER` ASC) VISIBLE)
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `dyope_assistant`.`operacoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `operacoes` (
  `IDOPERACAO` INT(11) NOT NULL,
  `DESCRICAO_OPE` VARCHAR(150) NOT NULL,
  `TEMPO_LIMITE_OPE` DATETIME NOT NULL,
  `NUM_FUNC_OPE` INT(11) NOT NULL,
  `PRECO_PECA_OPE` FLOAT NOT NULL,
  `CUSTOS_OPE` FLOAT NOT NULL,
  `TEMPO_NESC_OPE` DATETIME NOT NULL,
  `QTD_PECA_FUNC_OPE` INT(11) NOT NULL,
  `LOTE_PRODUCAO` INT(11) NOT NULL,
  `STATUS_SYS` CHAR(1) NOT NULL,
  `IDGERENTE` INT(11) NOT NULL)
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `dyope_assistant`.`tipos_logradouros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tipos_logradouros` (
  `IDTIPO_LOG` INT(11) NOT NULL,
  `NOME_LOG` VARCHAR(100) NOT NULL,
  `TIPO_LOG` VARCHAR(35) NOT NULL,
  `STATUS_SYS` CHAR(1) NOT NULL,
  PRIMARY KEY (`IDTIPO_LOG`))
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `dyope_assistant`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `usuarios` (
  `IDUSUARIO` INT(11) NOT NULL,
  `NOME_USU` VARCHAR(60) NOT NULL,
  `SENHA_USU` VARCHAR(60) NOT NULL,
  `STATUS_SYS` CHAR(1) NOT NULL,
  PRIMARY KEY (`IDUSUARIO`),
  UNIQUE INDEX `NOME_USU` (`NOME_USU` ASC) VISIBLE,
  UNIQUE INDEX `SENHA_USU` (`SENHA_USU` ASC) VISIBLE)
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `db_dyope_assistant`.`bairros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bairros` (
  `IDBAIRRO` INT(11) NOT NULL,
  `NOME_BAI` VARCHAR(80) NOT NULL,
  `STATUS_SYS` CHAR(1) NOT NULL,
  PRIMARY KEY (`IDBAIRRO`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `db_dyope_assistant`.`cidades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_dyope_assistant`.`cidades` (
  `IDCIDADE` INT(11) NOT NULL,
  `NOME_CID` VARCHAR(80) NOT NULL,
  `STATUS_SYS` CHAR(1) NOT NULL,
  PRIMARY KEY (`IDCIDADE`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `db_dyope_assistant`.`tipos_logradouros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_dyope_assistant`.`tipos_logradouros` (
  `IDTIPO_LOG` INT(11) NOT NULL,
  `NOME_LOG` VARCHAR(100) NOT NULL,
  `TIPO_LOG` VARCHAR(35) NOT NULL,
  `STATUS_SYS` CHAR(1) NOT NULL,
  PRIMARY KEY (`IDTIPO_LOG`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `db_dyope_assistant`.`enderecos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_dyope_assistant`.`enderecos` (
  `IDENDERECO` INT(11) NOT NULL,
  `IDBAIRRO` INT(11) NOT NULL,
  `IDCIDADE` INT(11) NOT NULL,
  `IDTIPO_LOG` INT(11) NOT NULL,
  `CEP_END` VARCHAR(8) NOT NULL,
  `NOME_LOG_END` VARCHAR(70) NOT NULL,
  PRIMARY KEY (`IDENDERECO`),
  INDEX `IDBAIRRO_idx` (`IDBAIRRO` ASC) VISIBLE,
  INDEX `IDCIDADE_idx` (`IDCIDADE` ASC) VISIBLE,
  INDEX `IDTIPO_LOG_idx` (`IDTIPO_LOG` ASC) VISIBLE,
  CONSTRAINT `IDBAIRRO`
    FOREIGN KEY (`IDBAIRRO`)
    REFERENCES `db_dyope_assistant`.`bairros` (`IDBAIRRO`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `IDCIDADE`
    FOREIGN KEY (`IDCIDADE`)
    REFERENCES `db_dyope_assistant`.`cidades` (`IDCIDADE`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `IDTIPO_LOG`
    FOREIGN KEY (`IDTIPO_LOG`)
    REFERENCES `db_dyope_assistant`.`tipos_logradouros` (`IDTIPO_LOG`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `db_dyope_assistant`.`operacoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_dyope_assistant`.`operacoes` (
  `IDOPERACAO` INT(11) NOT NULL,
  `DESCRICAO_OPE` VARCHAR(150) NOT NULL,
  `TEMPO_LIMITE_OPE` DATETIME NOT NULL,
  `NUM_FUNC_OPE` INT(11) NOT NULL,
  `PRECO_PECA_OPE` FLOAT NOT NULL,
  `CUSTOS_OPE` FLOAT NOT NULL,
  `TEMPO_NESC_OPE` DATETIME NOT NULL,
  `QTD_PECA_FUNC_OPE` INT(11) NOT NULL,
  `LOTE_PRODUCAO` INT(11) NOT NULL,
  `STATUS_SYS` CHAR(1) NOT NULL,
  `IDGERENTE` INT(11) NOT NULL,
  PRIMARY KEY (`IDOPERACAO`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `db_dyope_assistant`.`funcionarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_dyope_assistant`.`funcionarios` (
  `IDFUNCIONARIO` INT(11) NOT NULL,
  `NOME_FUN` VARCHAR(40) NOT NULL,
  `CPF_FUN` VARCHAR(11) NOT NULL,
  `RG_FUNC` VARCHAR(10) NOT NULL,
  `DATA_NASC_FUN` DATE NOT NULL,
  `DATA_ADMS_FUN` DATE NOT NULL,
  `EMAIL_FUN` VARCHAR(60) NULL DEFAULT NULL,
  `FONE_FUN` VARCHAR(9) NULL DEFAULT NULL,
  `IDOPERACAO` INT(11) NULL DEFAULT NULL,
  `IDENDERECO` INT(11) NOT NULL,
  PRIMARY KEY (`IDFUNCIONARIO`),
  UNIQUE INDEX `CPF_FUN` (`CPF_FUN` ASC) VISIBLE,
  UNIQUE INDEX `RG_FUNC` (`RG_FUNC` ASC) VISIBLE,
  UNIQUE INDEX `EMAIL_FUN` (`EMAIL_FUN` ASC) VISIBLE,
  INDEX `IDOPERACAO_idx` (`IDOPERACAO` ASC) VISIBLE,
  INDEX `IDENDERECO_idx` (`IDENDERECO` ASC) VISIBLE,
  CONSTRAINT `IDOPERACAO`
    FOREIGN KEY (`IDOPERACAO`)
    REFERENCES `db_dyope_assistant`.`operacoes` (`IDOPERACAO`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `IDENDERECO`
    FOREIGN KEY (`IDENDERECO`)
    REFERENCES `db_dyope_assistant`.`enderecos` (`IDENDERECO`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `IDOPERACAO`
    FOREIGN KEY (`IDOPERACAO`)
    REFERENCES `db_dyope_assistant`.`operacoes` (`IDOPERACAO`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `db_dyope_assistant`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_dyope_assistant`.`usuarios` (
  `IDUSUARIO` INT(11) NOT NULL,
  `NOME_USU` VARCHAR(60) NOT NULL,
  `SENHA_USU` VARCHAR(60) NOT NULL,
  `STATUS_SYS` CHAR(1) NOT NULL,
  PRIMARY KEY (`IDUSUARIO`),
  UNIQUE INDEX `NOME_USU` (`NOME_USU` ASC) VISIBLE,
  UNIQUE INDEX `SENHA_USU` (`SENHA_USU` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `db_dyope_assistant`.`gerentes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_dyope_assistant`.`gerentes` (
  `IDGERENTE` INT(11) NOT NULL,
  `NOME_GER` VARCHAR(40) NOT NULL,
  `EMAIL_GER` VARCHAR(50) NOT NULL,
  `CPF_GER` VARCHAR(11) NOT NULL,
  `RG_GER` VARCHAR(10) NOT NULL,
  `DATA_NASC_GER` DATE NOT NULL,
  `DATA_ADMS_GER` DATE NOT NULL,
  `IDENDERECO` INT(11) NOT NULL,
  `IDUSUARIO` INT(11) NOT NULL,
  `STATUS_SYS` CHAR(1) NOT NULL,
  PRIMARY KEY (`IDGERENTE`),
  UNIQUE INDEX `EMAIL_GER` (`EMAIL_GER` ASC) VISIBLE,
  UNIQUE INDEX `CPF_GER` (`CPF_GER` ASC) VISIBLE,
  UNIQUE INDEX `RG_GER` (`RG_GER` ASC) VISIBLE,
  INDEX `IDUSUARIO_idx` (`IDUSUARIO` ASC) VISIBLE,
  INDEX `IDENDERECO_idx` (`IDENDERECO` ASC) VISIBLE,
  CONSTRAINT `IDUSUARIO`
    FOREIGN KEY (`IDUSUARIO`)
    REFERENCES `db_dyope_assistant`.`usuarios` (`IDUSUARIO`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `IDENDERECO`
    FOREIGN KEY (`IDENDERECO`)
    REFERENCES `db_dyope_assistant`.`enderecos` (`IDENDERECO`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

USE `db_dyopeassistant` ;

-- -----------------------------------------------------
-- Table `db_dyopeassistant`.`bairros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_dyopeassistant`.`bairros` (
  `IDBAIRRO` INT(11) NOT NULL,
  `NOME_BAI` VARCHAR(80) NOT NULL,
  `STATUS_SYS` CHAR(1) NOT NULL,
  PRIMARY KEY (`IDBAIRRO`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `db_dyopeassistant`.`cidades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_dyopeassistant`.`cidades` (
  `IDCIDADE` INT(11) NOT NULL,
  `NOME_CID` VARCHAR(80) NOT NULL,
  `STATUS_SYS` CHAR(1) NOT NULL,
  PRIMARY KEY (`IDCIDADE`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `db_dyopeassistant`.`enderecos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_dyopeassistant`.`enderecos` (
  `IDENDERECO` INT(11) NOT NULL,
  `IDBAIRRO` INT(11) NOT NULL,
  `IDCIDADE` INT(11) NOT NULL,
  `IDTIPO_LOG` INT(11) NOT NULL,
  `CEP_END` VARCHAR(8) NOT NULL,
  `NOME_LOG_END` VARCHAR(70) NOT NULL,
  PRIMARY KEY (`IDENDERECO`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `db_dyopeassistant`.`funcionarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_dyopeassistant`.`funcionarios` (
  `IDFUNCIONARIO` INT(11) NOT NULL,
  `NOME_FUN` VARCHAR(40) NOT NULL,
  `CPF_FUN` VARCHAR(11) NOT NULL,
  `RG_FUNC` VARCHAR(10) NOT NULL,
  `DATA_NASC_FUN` DATE NOT NULL,
  `DATA_ADMS_FUN` DATE NOT NULL,
  `EMAIL_FUN` VARCHAR(60) NULL DEFAULT NULL,
  `FONE_FUN` VARCHAR(9) NULL DEFAULT NULL,
  `IDOPERACAO` INT(11) NULL DEFAULT NULL,
  `IDENDERECO` INT(11) NOT NULL,
  `IDUSUARIO` INT(11) NOT NULL,
  PRIMARY KEY (`IDFUNCIONARIO`),
  UNIQUE INDEX `CPF_FUN` (`CPF_FUN` ASC) VISIBLE,
  UNIQUE INDEX `RG_FUNC` (`RG_FUNC` ASC) VISIBLE,
  UNIQUE INDEX `EMAIL_FUN` (`EMAIL_FUN` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `db_dyopeassistant`.`gerentes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_dyopeassistant`.`gerentes` (
  `IDGERENTE` INT(11) NOT NULL AUTO_INCREMENT,
  `NOME_GER` VARCHAR(40) NOT NULL,
  `EMAIL_GER` VARCHAR(50) NOT NULL,
  `CPF_GER` VARCHAR(11) NOT NULL,
  `RG_GER` VARCHAR(10) NOT NULL,
  `DATA_NASC_GER` DATE NOT NULL,
  `DATA_ADMS_GER` DATE NOT NULL,
  `IDENDERECO` INT(11) NOT NULL,
  `IDUSUARIO` INT(11) NOT NULL,
  `STATUS_SYS` CHAR(1) NOT NULL,
  PRIMARY KEY (`IDGERENTE`),
  UNIQUE INDEX `EMAIL_GER` (`EMAIL_GER` ASC) VISIBLE,
  UNIQUE INDEX `CPF_GER` (`CPF_GER` ASC) VISIBLE,
  UNIQUE INDEX `RG_GER` (`RG_GER` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `db_dyopeassistant`.`operacoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_dyopeassistant`.`operacoes` (
  `IDOPERACAO` INT(11) NOT NULL,
  `DESCRICAO_OPE` VARCHAR(150) NOT NULL,
  `TEMPO_LIMITE_OPE` DATETIME NOT NULL,
  `NUM_FUNC_OPE` INT(11) NOT NULL,
  `PRECO_PECA_OPE` FLOAT NOT NULL,
  `CUSTOS_OPE` FLOAT NOT NULL,
  `TEMPO_NESC_OPE` DATETIME NOT NULL,
  `QTD_PECA_FUNC_OPE` INT(11) NOT NULL,
  `LOTE_PRODUCAO` INT(11) NOT NULL,
  `STATUS_SYS` CHAR(1) NOT NULL,
  `IDGERENTE` INT(11) NOT NULL,
  `IDTIPO_OPE` INT(11) NOT NULL,
  PRIMARY KEY (`IDOPERACAO`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `db_dyopeassistant`.`tipos_logradouros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_dyopeassistant`.`tipos_logradouros` (
  `IDTIPO_LOG` INT(11) NOT NULL,
  `NOME_LOG` VARCHAR(100) NOT NULL,
  `TIPO_LOG` VARCHAR(35) NOT NULL,
  `STATUS_SYS` CHAR(1) NOT NULL,
  PRIMARY KEY (`IDTIPO_LOG`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `db_dyopeassistant`.`tipos_ope`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_dyopeassistant`.`tipos_ope` (
  `IDTIPO_OPE` INT(11) NOT NULL,
  `TIPO_OPE` VARCHAR(20) NOT NULL,
  `STATUS_SYS` CHAR(1) NOT NULL,
  PRIMARY KEY (`IDTIPO_OPE`),
  UNIQUE INDEX `IDTIPO_OPE` (`IDTIPO_OPE` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `db_dyopeassistant`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_dyopeassistant`.`usuarios` (
  `IDUSUARIO` INT(11) NOT NULL,
  `NOME_USU` VARCHAR(60) NOT NULL,
  `SENHA_USU` VARCHAR(60) NOT NULL,
  `STATUS_SYS` CHAR(1) NOT NULL,
  PRIMARY KEY (`IDUSUARIO`),
  UNIQUE INDEX `NOME_USU` (`NOME_USU` ASC) VISIBLE,
  UNIQUE INDEX `SENHA_USU` (`SENHA_USU` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
