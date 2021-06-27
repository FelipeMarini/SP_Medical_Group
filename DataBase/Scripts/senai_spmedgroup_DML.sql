USE SpMedicalGroup;
GO

INSERT INTO Clinicas(nomeClinica,cnpj,razaoSocial,horarioAbertura,horarioFechamento)
VALUES ('Clínica Saulo', '12.339.788/3890-11', 'SP Medical Group', '08:00', '18:00'),
	   ('Clínica Felipe', '36.654.991/1432-23', 'SP Medical Group', '09:00', '19:00');
GO

INSERT INTO TiposUsuarios(tituloTipoUsuario)
VALUES ('Administrador'),
	   ('Médico'),
	   ('Paciente');
GO

INSERT INTO Especialidades(tituloEspecialidade)
VALUES ('Acupuntura'),
	   ('Anestesiologia'),
	   ('Angiologia'),
	   ('Cardiologia'),
	   ('Cirurgia Cardiovascular'),
	   ('Cirurgia da Mão'),
	   ('Cirurgia do Aparelho Digestivo'),
	   ('Cirurgia Geral'),
	   ('Cirurgia Pediátrica'),
	   ('Cirurgia Plástica'),
	   ('Cirurgia Torácica'),
	   ('Cirurgia Vascular'),
	   ('Dermatologia'),
	   ('Radioterapia'),
	   ('Urologia'),
	   ('Pediatria'),
	   ('Psiquiatria');
GO

INSERT INTO Situacao(descricaoSituacao)
VALUES ('Agendada'),
	   ('Realizada'),
	   ('Cancelada');
GO

INSERT INTO Usuarios(idTipoUsuario,email,senha)
VALUES (1, 'saulo@email.com', '89043'),
	   (2, 'lemos@email.com', '78456'),
	   (2, 'possarle@uol.com', '89765'),
	   (2, 'strada@bol.com', '33897'),
	   (3, 'felipemarini71188@gmail.com', '77341'),
	   (3, 'ligia@uol.com', '44813'),
	   (3, 'alexandre@bol.com', '11122'),
	   (3, 'fernando@gmail.com', '44477'),
	   (3, 'henrique@outlook.com', '78903'),
	   (3, 'joao@uol.com.br', '23451'),
	   (3, 'bruno@hotmail.com.br', '12345');
GO

INSERT INTO Pacientes(idUsuario,nomePaciente,dataNascimento,telefone,rg,cpf,endereco)
VALUES (5, 'Felipe', '1988/11/07', '(11) 961050830', '46.017.622.5', '387.153.608.30',
	   'Rua Catão, 1292 - São Paulo, SP'),
	   
	   (6, 'Lígia', '1985/08/09', '(11) 976548976', '54.098.222.3', '456.356.998.21',
	   'Rua Mamão, 13 - São Paulo, SP'),
	   
	   (7, 'Alexandre', '2007/07/07', '(11) 976539087', '65.988.456.8', '321.567.997.13',
	   'Rua Laranja, 67 - São Paulo, SP'),
	   
	   (8, 'Fernando', '2006/06/06', '(11) 967885542', '77.890.122.9', '135.789.547.26',
	   'Rua Pêssego, 900 - São Paulo, SP'),
	   
	   (9, 'Henrique', '2005/05/05', '(11) 921345678', '45.765.321.7', '788.231.189.10',
	   'Rua Limão, 17 - São Paulo, SP'),
	   
	   (10, 'João', '2004/04/04', '(19) 980795532', '65.453.900.4', '123.456.789.00',
	   'Rua Melancia, 69 - São Paulo, SP'),
	   
	   (11, 'Bruno', '2003/03/03', '(31) 955677788', '21.997.124.5', '889.334.758.26',
	   'Rua Morango, 77 - São Paulo, SP');
GO

INSERT INTO Medicos(idClinica,idEspecialidade,idUsuario,nomeMedico,crm)
VALUES (1, 2, 2, 'Ricardo Lemos', '4569-0/SP'),
	   (2, 17, 3, 'Roberto Possarle', '2349-8/SP'),
	   (2, 16, 4, 'Helena Strada', '3348-9/SP');
GO

INSERT INTO Consultas(idMedico,idPaciente,idSituacao,dataConsulta,descricao)
VALUES (1, 1, 1, '2021/03/21', 'realizar anestesia'),
	   (1, 2, 1, '2021/04/22', 'ver braço'),
	   (2, 3, 2, '2021/05/23', 'dar remédio'),
	   (2, 4, 2, '2021/06/24', 'atendimento'),
	   (3, 5, 3, '2021/07/25', 'cirurgia'),
	   (3, 6, 3, '2021/08/26', 'consulta'),
	   (3, 7, 3, '2021/09/27', 'consulta');








