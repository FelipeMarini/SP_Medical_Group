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

    public class UsuariosController : ControllerBase
    {

        private IUsuarioRepository _usuarioRepository { get; set; }



        public UsuariosController()
        {
            _usuarioRepository = new UsuarioRepository();
        }


        //[Authorize(Roles = "1")]
        [HttpGet]
        public IActionResult GetUser()
        {
            try
            {
                return Ok(_usuarioRepository.ListarUsuarios());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        //[Authorize(Roles = "1")]
        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            try
            {
                return Ok(_usuarioRepository.BuscarUsuarioPorId(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }



        //[Authorize(Roles = "1")]
        [HttpPost]
        public IActionResult PostUser(Usuario novoUsuario)
        {
            try
            {
                _usuarioRepository.CadastrarUsuario(novoUsuario);

                return StatusCode(201);    //  não consigo usar return Created();?
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }



        //[Authorize(Roles = "1")]
        [HttpPut("{id}")]
        public IActionResult PutUser(int id, Usuario usuarioAtualizado)
        {
            try
            {
                _usuarioRepository.AtualizarUrlUsuario(id, usuarioAtualizado);

                return NoContent();   // status code 204
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        //[Authorize(Roles = "1")]
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            try
            {
                _usuarioRepository.DeletarUsuario(id);

                return StatusCode(204);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }



    }
}
