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

    public class MedicosController : ControllerBase
    {

        // declarado o objeto do tipo da interface para receber todos os métodos definidos(CRUD) em IMedicoRepository
        private IMedicoRepository _medicoRepository { get; set; }


        // método construtor que instancia automaticamente o objeto _medicoRepository do tipo do repositório
        // quando o controlador MedicosController é invocado, e ter referência aos métodos desenvolvidos em MedicoRepository
        public MedicosController()
        {
            _medicoRepository = new MedicoRepository();
        }


        //[Authorize(Roles = "1,2")]
        [HttpGet]
        public IActionResult GetDoctors()
        {
            try
            {
                return Ok(_medicoRepository.ListarMedicos());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);   // status code 400
            }
        }


        //[Authorize(Roles = "1,2")]
        [HttpGet("{id}")]
        public IActionResult GetDoctorById(int id)
        {
            try
            {
                return Ok(_medicoRepository.BuscarMedicoPorId(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        //[Authorize(Roles = "1")]
        [HttpPost]
        public IActionResult PostDoctor(Medico novoMedico)
        {
            try
            {
                _medicoRepository.CadastrarMedico(novoMedico);

                return StatusCode(201);   // status code "created"
            }

            catch (Exception ex)
            {
                return BadRequest(ex);   // status code 400
            }

        }


        //[Authorize(Roles = "1")]
        [HttpPut("{id}")]
        public IActionResult PutDoctor(int id, Medico medicoAtualizado)
        {
            try
            {
                _medicoRepository.AtualizarUrlMedico(id, medicoAtualizado);

                return StatusCode(204);  // status code "no content"
            }

            catch (Exception ex)
            {
                return BadRequest(ex);
            }

        }


        //[Authorize(Roles = "1")]
        [HttpDelete("{id}")]
        public IActionResult DeleteDoctor(int id)
        {
            try
            {
                _medicoRepository.DeletarMedico(id);

                return StatusCode(204);
            }

            catch (Exception ex)
            {
                return BadRequest(ex);
            }

        }



    }

}
