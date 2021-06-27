using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpMedicalGroup.webAPI.Domains;
using SpMedicalGroup.webAPI.Interfaces;
using SpMedicalGroup.webAPI.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.webAPI.Controllers
{
    [Produces("application/json")]

    [Route("api/[controller]")]

    [ApiController]

    public class PacientesController : ControllerBase
    {

        private IPacienteRepository _pacienteRepository { get; set; }


        public PacientesController()
        {
            _pacienteRepository = new PacienteRepository();
        }


        //[Authorize(Roles = "1,2")]
        [HttpGet]
        public IActionResult GetPatients()
        {
            try
            {
                return Ok(_pacienteRepository.ListarPacientes());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        //[Authorize(Roles = "1,2")]
        [HttpGet("{id}")]
        public IActionResult GetPatientById(int id)
        {
            try
            {
                return Ok(_pacienteRepository.BuscarPacientePorId(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        //[Authorize(Roles = "1")]
        [HttpPost]
        public IActionResult PostPatient(Paciente novoPaciente)
        {
            try
            {
                _pacienteRepository.CadastrarPaciente(novoPaciente);

                return StatusCode(201);    //  não consigo usar return Created();?
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        //[Authorize(Roles = "1")]
        [HttpPut("{id}")]
        public IActionResult PutPatient(int id, Paciente pacienteAtualizado)
        {
            try
            {
                _pacienteRepository.AtualizarUrlPaciente(id, pacienteAtualizado);

                return NoContent();   // status code 204
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        //[Authorize(Roles = "1")]
        [HttpDelete("{id}")]
        public IActionResult DeletePatient(int id)
        {
            try
            {
                _pacienteRepository.DeletarPaciente(id);

                return StatusCode(204);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }



    }
}
