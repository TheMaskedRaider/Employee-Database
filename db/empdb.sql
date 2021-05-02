DROP DATABASE IF EXISTS employees_DB;

CREATE DATABASE employees_DB;

USE employees_DB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(45) NULL,
  salary DECIMAL(10.3) NULL,
  department_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(45) NULL,
  last_name VARCHAR(45) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO department (id, name)
VALUES
('1', 'finance'),
('2', 'sales'),
('3', 'hr');

INSERT INTO role(id, title, salary, department_id)
VALUES
('30', 'manager', '40000', 3),
('40', 'sales representitive', '30000', 2),
('20', 'accountant', '25000', 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('bob', 'bill', '30', null),
('bill', 'bob', '40', '1'),
('bob', 'bill', '40', '1'),
('bobobo', 'bobobobo', '20', '5'),
('rob', 'robertson', '30', null);


  