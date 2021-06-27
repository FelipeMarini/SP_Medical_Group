using Microsoft.EntityFrameworkCore;
using SpMedicalGroup.webAPI.Context;
using SpMedicalGroup.webAPI.Domains;
using SpMedicalGroup.webAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.webAPI.Repositories
{
    
        public class ConsultaRepository : IConsultaRepository
        {

            SpMedicalGroupContext ctx = new SpMedicalGroupContext();

            
            public void AtualizarUrlConsulta(int id, Consulta consultaAtualizada)
            {
                Consulta consultaBuscada = BuscarConsultaPorId(id);

                
                    consultaBuscada.IdMedico = consultaAtualizada.IdMedico;
                
                    consultaBuscada.IdPaciente = consultaAtualizada.IdPaciente;
                
                    consultaBuscada.IdSituacao = consultaAtualizada.IdSituacao;

                    consultaBuscada.DataConsulta = consultaAtualizada.DataConsulta;
                

                if (consultaAtualizada.Descricao != null)
                {
                    consultaBuscada.Descricao = consultaAtualizada.Descricao;
                }

                ctx.Consultas.Update(consultaBuscada);

                ctx.SaveChanges();
            }


            
            public Consulta BuscarConsultaPorId(int id)
            {
                return ctx.Consultas.FirstOrDefault(con => con.IdConsulta == id);
            }



            
            public void CadastrarConsulta(Consulta novaConsulta)
            {
                ctx.Consultas.Add(novaConsulta);

                ctx.SaveChanges();
            }


            public void DeletarConsulta(int id)
            {
                ctx.Consultas.Remove(BuscarConsultaPorId(id));

                ctx.SaveChanges();
            }


            public List<Consulta> ListarConsultas()
            {
                return ctx.Consultas
                .Include(c => c.IdMedicoNavigation)
                .Include(c => c.IdPacienteNavigation)
                .Include(c => c.IdSituacaoNavigation)
                
                .Select(c => new Consulta()
                {
                    IdConsulta = c.IdConsulta,
                    IdMedico = c.IdMedico,
                    IdPaciente = c.IdPaciente,
                    IdSituacao = c.IdSituacao,
                    DataConsulta = c.DataConsulta,
                    Descricao = c.Descricao,

                    IdMedicoNavigation = new Medico()
                    {
                        IdMedico = c.IdMedicoNavigation.IdMedico,
                        NomeMedico = c.IdMedicoNavigation.NomeMedico,
                        IdEspecialidade = c.IdMedicoNavigation.IdEspecialidade,

                        IdEspecialidadeNavigation = new Especialidade()
                        {
                            TituloEspecialidade = c.IdMedicoNavigation.IdEspecialidadeNavigation.TituloEspecialidade
                        }

                    },

                    IdPacienteNavigation = new Paciente()
                    {
                        IdPaciente = c.IdPacienteNavigation.IdPaciente,
                        NomePaciente = c.IdPacienteNavigation.NomePaciente,
                        DataNascimento = c.IdPacienteNavigation.DataNascimento,
                        Telefone = c.IdPacienteNavigation.Telefone
                    },

                    IdSituacaoNavigation = new Situacao()
                    {
                        IdSituacao = c.IdSituacaoNavigation.IdSituacao,
                        DescricaoSituacao = c.IdSituacaoNavigation.DescricaoSituacao
                    }
                
                })
                
                .ToList();
        }


            
            
        public List<Consulta> ListarConsultasMedico(int id)
        {
            
            // Retorna uma lista com todas as informações das consultas
            return ctx.Consultas
                
            // Adiciona na busca as informações do médico das consultas
            .Include(p => p.IdMedicoNavigation)
                
            // Adiciona na busca as informações dos pacientes das consultas
            .Include(p => p.IdPacienteNavigation)
                
            // Adiciona na busca as informações das descrições das situações das consultas
            .Include(p => p.IdSituacaoNavigation)
                
            // Estabelece como parâmetro de consulta o id de usuário do médico recebido
            .Where(p => p.IdMedicoNavigation.IdUsuario == id)
                
            .ToList();
            
        }


        public List<Consulta> ListarConsultasPaciente(int id)
        {

            // Retorna uma lista com todas as informações das consultas
            return ctx.Consultas

            // Adiciona na busca as informações dos médicos das consultas
            .Include(p => p.IdMedicoNavigation)

            // Adiciona na busca as informações do paciente das consultas
            .Include(p => p.IdPacienteNavigation)

            // Adiciona na busca as informações das descrições das situações das consultas
            .Include(p => p.IdSituacaoNavigation)

            // Estabelece como parâmetro de consulta o id de usuário do paciente recebido
            .Where(p => p.IdPacienteNavigation.IdUsuario == id)

            .ToList();

        }





        public void AlterarSituacaoConsulta(int id, int situacao)
        {
                // Busca a primeira consulta para o id informado e armazena no objeto consultaBuscada
                Consulta consultaBuscada = ctx.Consultas

                // Adiciona na busca as informações do médico que participa da consulta a ser alterada
                .Include(p => p.IdMedicoNavigation)

                // Adiciona na busca as informações do paciente que participa da consulta a ser alterada
                .Include(p => p.IdPacienteNavigation)

                // Adiciona na busca as informações da descrição da situação da consulta
                .Include(p => p.IdSituacaoNavigation)

                .FirstOrDefault(p => p.IdConsulta == id);   //relembrar FirstorDefault()

                
                switch (situacao)
                {
                
                case 1:
                    consultaBuscada.IdSituacao = 1;  //agendada
                    break;


                case 2:
                    consultaBuscada.IdSituacao = 2; //realizada
                    break;


                case 3:
                    consultaBuscada.IdSituacao = 3; //cancelada
                    break;

                
                default:
                    consultaBuscada.IdSituacao = consultaBuscada.IdSituacao;
                    break;
                }

            
            ctx.Consultas.Update(consultaBuscada);

            
            ctx.SaveChanges();
        
        
        }

    
    }
    
}
