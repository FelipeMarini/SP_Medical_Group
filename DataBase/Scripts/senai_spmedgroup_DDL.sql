CREATE DATABASE SpMedicalGroup;
GO

USE SpMedicalGroup;
GO

CREATE TABLE Clinicas
(
	idClinica INT PRIMARY KEY IDENTITY,
	nomeClinica VARCHAR(100) UNIQUE NOT NULL,
	cnpj CHAR(50) UNIQUE NOT NULL,
	razaoSocial VARCHAR(100) NOT NULL,
	horarioAbertura TIME,
	horarioFechamento TIME, 
);
GO

CREATE TABLE TiposUsuarios
(
	idTipoUsuario INT PRIMARY KEY IDENTITY,
	tituloTipoUsuario VARCHAR(100) UNIQUE NOT NULL,
);
GO

CREATE TABLE Especialidades
(
	idEspecialidade INT PRIMARY KEY IDENTITY,
	tituloEspecialidade VARCHAR(100) UNIQUE NOT NULL
);
GO

CREATE TABLE Situacao
(
	idSituacao INT PRIMARY KEY IDENTITY,
	descricaoSituacao VARCHAR(100) UNIQUE NOT NULL
);
GO

CREATE TABLE Usuarios
(
	idUsuario INT PRIMARY KEY IDENTITY,
	idTipoUsuario INT FOREIGN KEY REFERENCES TiposUsuarios(idTipoUsuario),
	email VARCHAR(50) UNIQUE NOT NULL,
	senha VARCHAR(50) NOT NULL
);
GO

CREATE TABLE Pacientes
(
	idPaciente INT PRIMARY KEY IDENTITY,
	idUsuario INT FOREIGN KEY REFERENCES Usuarios(idUsuario),
	nomePaciente VARCHAR(100) NOT NULL,
	dataNascimento DATETIME NOT NULL,
	telefone VARCHAR(50) NOT NULL,
	rg CHAR(50) UNIQUE NOT NULL,
	cpf CHAR(50) UNIQUE NOT NULL,
	endereco VARCHAR(200) NOT NULL
);
GO

CREATE TABLE Medicos
(
	idMedico INT PRIMARY KEY IDENTITY,
	idClinica INT FOREIGN KEY REFERENCES Clinicas(idClinica),
	idEspecialidade INT FOREIGN KEY REFERENCES Especialidades(idEspecialidade),
	idUsuario INT FOREIGN KEY REFERENCES Usuarios(idUsuario),
	nomeMedico VARCHAR(100) NOT NULL,
	crm VARCHAR(50) UNIQUE NOT NULL
);
GO

CREATE TABLE Consultas
(
	idConsulta INT PRIMARY KEY IDENTITY,
	idMedico INT FOREIGN KEY REFERENCES Medicos(idMedico),
	idPaciente INT FOREIGN KEY REFERENCES Pacientes(idPaciente),
	idSituacao INT FOREIGN KEY REFERENCES Situacao(idSituacao),
	dataConsulta DATETIME NOT NULL,
	descricao TEXT NOT NULL 
);

