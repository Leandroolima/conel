-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema conel
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema conel
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `conel` DEFAULT CHARACTER SET latin1 ;
USE `conel` ;

-- -----------------------------------------------------
-- Table `conel`.`cadastro_fornecedores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `conel`.`cadastro_fornecedores` (
  `id_cadastrado` INT(11) NOT NULL AUTO_INCREMENT,
  `razao_social` VARCHAR(100) NULL DEFAULT NULL,
  `cnpj` VARCHAR(18) NULL DEFAULT NULL,
  `endereco` VARCHAR(30) NULL DEFAULT NULL,
  `cidade` VARCHAR(30) NULL DEFAULT NULL,
  `bairro` VARCHAR(30) NULL DEFAULT NULL,
  `estado` VARCHAR(25) NULL DEFAULT NULL,
  `cep` VARCHAR(10) NULL DEFAULT NULL,
  `telefone1` VARCHAR(20) NULL DEFAULT NULL,
  `telefone2` VARCHAR(20) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `inscricao_estadual` VARCHAR(25) NULL DEFAULT NULL,
  `arquivo` VARCHAR(125) NULL DEFAULT NULL,
  PRIMARY KEY (`id_cadastrado`),
  UNIQUE INDEX `id_cadastrado_UNIQUE` (`id_cadastrado` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `conel`.`canal_denuncia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `conel`.`canal_denuncia` (
  `id_denuncia` INT(11) NOT NULL AUTO_INCREMENT,
  `canal_denuncia` VARCHAR(10000) NULL DEFAULT NULL,
  `arquivo` VARCHAR(150) NULL DEFAULT NULL,
  `data_denuncia` VARCHAR(35) NULL DEFAULT NULL,
  PRIMARY KEY (`id_denuncia`),
  UNIQUE INDEX `id_denuncia_UNIQUE` (`id_denuncia` ASC) )
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `conel`.`trabalhe_conel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `conel`.`trabalhe_conel` (
  `id_trabalhe` INT(11) NOT NULL AUTO_INCREMENT,
  `conte_mais` VARCHAR(1000) NULL DEFAULT NULL,
  `arquivo` VARCHAR(125) NULL DEFAULT NULL,
  `data_curriculo` VARCHAR(35) NULL DEFAULT NULL,
  PRIMARY KEY (`id_trabalhe`),
  UNIQUE INDEX `id_trabalhe_UNIQUE` (`id_trabalhe` ASC) )
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `conel`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `conel`.`usuarios` (
  `id_usuario` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NULL DEFAULT NULL,
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `id_usuarios_UNIQUE` (`id_usuario` ASC) ,
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;