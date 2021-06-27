using SpMedicalGroup.webAPI.Context;
using SpMedicalGroup.webAPI.Domains;
using SpMedicalGroup.webAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.webAPI.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {

        SpMedicalGroupContext ctx = new SpMedicalGroupContext();

        public void AtualizarUrlUsuario(int id, Usuario usuarioAtualizado)
        {
            Usuario usuarioBuscado = BuscarUsuarioPorId(id);

            if (usuarioAtualizado.IdTipoUsuario != null)
            {
                usuarioBuscado.IdTipoUsuario = usuarioAtualizado.IdTipoUsuario;
            }

            if (usuarioAtualizado.Email != null)
            {
                usuarioBuscado.Email = usuarioAtualizado.Email;
            }

            if (usuarioAtualizado.Senha != null)
            {
                usuarioBuscado.Senha = usuarioAtualizado.Senha;
            }

            ctx.Usuarios.Update(usuarioBuscado);

            ctx.SaveChanges();

        }



        public Usuario BuscarUsuarioPorId(int id)
        {
            return ctx.Usuarios.FirstOrDefault(u => u.IdUsuario == id);
        }



        public void CadastrarUsuario(Usuario novoUsuario)
        {
            ctx.Usuarios.Add(novoUsuario);

            ctx.SaveChanges();
        }



        public void DeletarUsuario(int id)
        {
            ctx.Usuarios.Remove(BuscarUsuarioPorId(id));

            ctx.SaveChanges();
        }



        public List<Usuario> ListarUsuarios()
        {
            return ctx.Usuarios.ToList();
        }


        public Usuario Login(string email, string senha)
        {
            return ctx.Usuarios.FirstOrDefault(u => u.Email == email && u.Senha == senha);
        }


    }
}
