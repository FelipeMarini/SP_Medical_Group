using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpMedicalGroup.webAPI.Domains;
using SpMedicalGroup.webAPI.Interfaces;
using SpMedicalGroup.webAPI.Repositories;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.webAPI.Controllers
{
    
    [Produces("application/json")]

    [Route("api/[controller]")]

    [ApiController]


    public class ConsultasController : ControllerBase
    {

        private IConsultaRepository _consultaRepository { get; set; }


        public ConsultasController()
        {
            _consultaRepository = new ConsultaRepository();
        }


        
        /*[Authorize]*/  // funcionalidades 5 e 7
        [HttpGet]
        public IActionResult GetAppointments()

        {
            try
            {
                return Ok(_consultaRepository.ListarConsultas());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        
        /*[Authorize(Roles = "1,2,3")]*/ // funcionalidades 5 e 7 
        [HttpGet("{id}")]
        public IActionResult GetAppointmentById(int id)
        {
            try
            {
                return Ok(_consultaRepository.BuscarConsultaPorId(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        
        /*[Authorize(Roles = "1")]*/  // funcionalidade 2
        [HttpPost]
        public IActionResult PostAppointment(Consulta novaConsulta)
        {
            try
            {
                _consultaRepository.CadastrarConsulta(novaConsulta);

                return StatusCode(201);    //  não consigo usar return Created();?
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        
        /*[Authorize(Roles = "1,2")]*/   // funcionalidade 6
        [HttpPut("{id}")]
        public IActionResult PutAppointment(int id, Consulta consultaAtualizada)
        {
            try
            {
                _consultaRepository.AtualizarUrlConsulta(id, consultaAtualizada);

                return NoContent();   // status code 204
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        
        /*[Authorize(Roles = "1")]*/  // funcionalidade 3
        [HttpDelete("{id}")]
        public IActionResult DeleteAppointment(int id)
        {
            try
            {
                _consultaRepository.DeletarConsulta(id);

                return StatusCode(204);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        
        
        /// <summary>
        /// Altera a situação de uma consulta
        /// </summary>
        /// 
        /// <param name="id"> id da consulta que terá a situação alterada</param>
        /// 
        /// <param name="situacao">Objeto com o parâmetro que atualiza a situação da consulta para agendada, realizada ou cancelada</param>
        /// 
        /// <returns>Um status code 204 - No Content</returns> 
        
        [Authorize(Roles = "1,2")]  // somente admnistrador e médico podem alterar a situação de uma consulta
        [HttpPatch("{id}")] // dominio/api/consultas/id
        public IActionResult PatchSituation(int id, Consulta situacao)
        {
            
            try
            {
                // Faz a chamada para o método
                _consultaRepository.AlterarSituacaoConsulta(id, situacao.IdSituacao);

                return StatusCode(204);
            }
            
            catch (Exception error)
            {

                return BadRequest(error);
            
            }
        
        }


        
        
        /// <summary>
        /// Lista todas as consultas de um determinado médico
        /// </summary>
        /// 
        /// <returns>Uma lista de consultas e um status code 200 - Ok</returns>
        
        ///[Authorize(Roles = "2")] // somente o médico pode acessar o método de listagem de suas consultas
        [HttpGet("medlist")]  // dominio/api/consultas/medlist 
        public IActionResult GetMyDoc()
        {
            
            try
            {
                // Cria uma variável idUsuario que recebe o valor do id do usuário que está logado
                int idUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                return Ok(_consultaRepository.ListarConsultasMedico(idUsuario));
            }
            
            catch (Exception error)
            {
                return BadRequest(new 
                {
                    mensagem = "Não é possível mostrar as presenças se o usuário não estiver logado!", error
                });
            }
        
        }



        
        /// <summary>
        /// Lista todas as consultas de um determinado paciente
        /// </summary>
        /// <returns>Uma lista de presenças e um status code 200 - Ok</returns>
       
        ///[Authorize(Roles = "3")] // somente o paciente pode acessar o método de listagem de suas consultas
        [HttpGet("paclist")]   // dominio/api/consultas/paclist
        public IActionResult GetMyPac()
        {
            
            try
            {
                // Cria uma variável idUsuario que recebe o valor do id do usuário que está logado
                int idUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                return Ok(_consultaRepository.ListarConsultasPaciente(idUsuario));
            }
            
            catch (Exception error)
            {

                return BadRequest(new
                {
                    mensagem = "Não é possível mostrar as presenças se o usuário não estiver logado!", error
                });
            
            }
        
        }



    
    
    }
}
