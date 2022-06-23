CREATE database zonagamer_db;
USE zonagamer_db;

CREATE TABLE IF NOT EXISTS `zonagamer_db`.`rol` (
  `ID_rol` INT(10) NOT NULL,
  `nombreRol` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID_rol`),
  UNIQUE INDEX `nombreRol_UNIQUE` (`nombreRol` ASC),
  UNIQUE INDEX `ID_rol_UNIQUE` (`ID_rol` ASC))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `zonagamer_db`.`estado` (
  `ID_estado` INT(10) NOT NULL,
  `nombreEstado` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID_estado`),
  UNIQUE INDEX `nombreEstado_UNIQUE` (`nombreEstado` ASC),
  UNIQUE INDEX `ID_estado_UNIQUE` (`ID_estado` ASC))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `zonagamer_db`.`category` (
  `ID_category` INT NOT NULL AUTO_INCREMENT,
  `nameCategory` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID_category`),
  UNIQUE INDEX `ID_category_UNIQUE` (`ID_category` ASC),
  UNIQUE INDEX `nameCategory_UNIQUE` (`nameCategory` ASC))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `zonagamer_db`.`users` (
  `ID_usuario` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `correoElectronico` VARCHAR(255) NOT NULL,
  `userName` VARCHAR(45) NOT NULL,
  `contrasenia` VARCHAR(45) NOT NULL,
  `imagenPerfil` VARCHAR(255) NOT NULL,
  `rol_ID_rol` INT(10) NOT NULL,
  `estado_ID_estado` INT(10) NOT NULL,
  PRIMARY KEY (`correoElectronico`, `userName`),
  UNIQUE INDEX `ID_usuario_UNIQUE` (`ID_usuario` ASC) ,
  UNIQUE INDEX `correoElectronico_UNIQUE` (`correoElectronico` ASC) ,
  UNIQUE INDEX `userName_UNIQUE` (`userName` ASC) ,
  INDEX `fk_user_rol_idx` (`rol_ID_rol` ASC) ,
  INDEX `fk_user_estado1_idx` (`estado_ID_estado` ASC) ,
  CONSTRAINT `fk_user_rol`
    FOREIGN KEY (`rol_ID_rol`)
    REFERENCES `zonagamer_db`.`rol` (`ID_rol`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_estado1`
    FOREIGN KEY (`estado_ID_estado`)
    REFERENCES `zonagamer_db`.`estado` (`ID_estado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `zonagamer_db`.`products` (
  `ID_products` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `warranty` INT(2) NOT NULL,
  `price` DECIMAL(10) NOT NULL,
  `discount` INT(3) NOT NULL,
  `date` DATE NOT NULL,
  `estado_ID_estado` INT(10) NOT NULL,
  `category_ID_category` INT NOT NULL,
  UNIQUE INDEX `ID_usuario_UNIQUE` (`ID_products` ASC),
  PRIMARY KEY (`ID_products`),
  INDEX `fk_products_estado1_idx` (`estado_ID_estado` ASC),
  INDEX `fk_products_category1_idx` (`category_ID_category` ASC),
  CONSTRAINT `fk_products_estado1`
    FOREIGN KEY (`estado_ID_estado`)
    REFERENCES `zonagamer_db`.`estado` (`ID_estado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_category1`
    FOREIGN KEY (`category_ID_category`)
    REFERENCES `zonagamer_db`.`category` (`ID_category`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `zonagamer_db`.`users_has_products` (
  `users_correoElectronico` VARCHAR(255) NOT NULL,
  `users_userName` VARCHAR(45) NOT NULL,
  `products_ID_products` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`users_correoElectronico`, `users_userName`, `products_ID_products`),
  INDEX `fk_users_has_products_products1_idx` (`products_ID_products` ASC),
  INDEX `fk_users_has_products_users1_idx` (`users_correoElectronico` ASC, `users_userName` ASC),
  CONSTRAINT `fk_users_has_products_users1`
    FOREIGN KEY (`users_correoElectronico` , `users_userName`)
    REFERENCES `zonagamer_db`.`users` (`correoElectronico` , `userName`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_products_products1`
    FOREIGN KEY (`products_ID_products`)
    REFERENCES `zonagamer_db`.`products` (`ID_products`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;





