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

    public class TiposUsuariosController : ControllerBase
    {

        private ITiposUsuarioRepository _tipoUsuarioRepository { get; set; }


        public TiposUsuariosController()
        {
            _tipoUsuarioRepository = new TiposUsuarioRepository();
        }


        //[Authorize(Roles = "1")]
        [HttpGet]
        public IActionResult GetUserType()
        {
            try
            {
                return Ok(_tipoUsuarioRepository.ListarTiposUsuarios());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        //[Authorize(Roles = "1")]
        [HttpGet("{id}")]
        public IActionResult GetUserTypeById(int id)
        {
            try
            {
                return Ok(_tipoUsuarioRepository.BuscarTipoUsuarioPorId(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        /*[Authorize(Roles = "1")]*/    // funcionalidade 1
        [HttpPost]
        public IActionResult PostUserType(TiposUsuario novoTipoUsuario)
        {
            try
            {
                _tipoUsuarioRepository.CadastrarTipoUsuario(novoTipoUsuario);

                return StatusCode(201);    //  não consigo usar return Created();?
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        //[Authorize(Roles = "1")]
        [HttpPut("{id}")]
        public IActionResult PutUserType(int id, TiposUsuario tipoUsuarioAtualizado)
        {
            try
            {
                _tipoUsuarioRepository.AtualizarUrlTipoUsuario(id, tipoUsuarioAtualizado);

                return NoContent();   // status code 204
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        //[Authorize(Roles = "1")]
        [HttpDelete("{id}")]
        public IActionResult DeleteUserType(int id)
        {
            try
            {
                _tipoUsuarioRepository.DeletarTipoUsuario(id);

                return StatusCode(204);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }



    }
}
