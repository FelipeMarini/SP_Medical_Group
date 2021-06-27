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

    public class ClinicasController : ControllerBase
    {

        private IClinicaRepository _clinicaRepository { get; set; }


        public ClinicasController()
        {
            _clinicaRepository = new ClinicaRepository();
        }

        //[Authorize(Roles = "1")]   // funcionalidade 4
        [HttpGet]
        public IActionResult GetClinics()
        {
            try
            {
                return Ok(_clinicaRepository.ListarClinicas());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        //[Authorize(Roles = "1")]   // funcionalidade 4
        [HttpGet("{id}")]
        public IActionResult GetClinicById(int id)
        {
            try
            {
                return Ok(_clinicaRepository.BuscarClinicaPorId(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        //[Authorize(Roles = "1")]  // funcionalidade 4
        [HttpPost]
        public IActionResult PostClinic(Clinica novaClinica)
        {
            try
            {
                _clinicaRepository.CadastrarClinica(novaClinica);

                return StatusCode(201);    //  não consigo usar return Created();?
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        //[Authorize(Roles = "1")]    // funcionalidade 4
        [HttpPut("{id}")]
        public IActionResult PutClinic(int id, Clinica clinicaAtualizada)
        {
            try
            {
                _clinicaRepository.AtualizarUrlClinica(id, clinicaAtualizada);

                return NoContent();   // status code 204
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        
        //[Authorize(Roles = "1")]  // funcionalidade 4
        [HttpDelete("{id}")]
        public IActionResult DeleteClinic(int id)
        {
            try
            {
                _clinicaRepository.DeletarClinica(id);

                return StatusCode(204);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }



    }
}
