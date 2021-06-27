using SpMedicalGroup.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.webAPI.Interfaces
{
    interface IConsultaRepository
    {
        
        List<Consulta> ListarConsultas();  // utiliza este método na listagem de consultas do admnistrador

        Consulta BuscarConsultaPorId(int id);

        void CadastrarConsulta(Consulta novaConsulta);

        void AtualizarUrlConsulta(int id, Consulta consultaAtualizada);

        void DeletarConsulta(int id);


        /// <summary>
        /// Admnistrador ou médico podem alterar a situação de uma consulta
        /// </summary>
        /// 
        /// <param name="id">id da consulta que terá sua situação alterada</param>
        /// 
        /// <param name="situacao"> int que atualiza a situação da consulta para:
        ///                         1-agendada, 2-realizada ou 3-cancelada  </param>
        ///   
        void AlterarSituacaoConsulta(int id, int situacao);


        /// <summary>
        /// Lista todas as consultas específicas de um determinado médico
        /// </summary>
        /// 
        /// <param name="id">id de usuario do médico que participa das consultas listadas</param>
        /// 
        /// <returns>Uma lista de consultas relacionadas a um determinado médico</returns>
        List<Consulta> ListarConsultasMedico(int id);

        
        /// <summary>
        /// Lista todas as consultas específicas de um determinado paciente
        /// </summary>
        /// 
        /// <param name="id">id de usuario do paciente que participa das consultas listadas</param>
        /// 
        /// <returns>Uma lista de consultas relacionadas a um determinado paciente</returns>
        List<Consulta> ListarConsultasPaciente(int id);


    
    }
}
