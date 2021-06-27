using SpMedicalGroup.webAPI.Context;
using SpMedicalGroup.webAPI.Domains;
using SpMedicalGroup.webAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.webAPI.Repositories
{
    public class TiposUsuarioRepository : ITiposUsuarioRepository
    {

        SpMedicalGroupContext ctx = new SpMedicalGroupContext();

        public void AtualizarUrlTipoUsuario(int id, TiposUsuario tipoUsuarioAtualizado)
        {
            TiposUsuario tipoUsuarioBuscado = BuscarTipoUsuarioPorId(id);

            if (tipoUsuarioAtualizado.TituloTipoUsuario != null)
            {
                tipoUsuarioBuscado.TituloTipoUsuario = tipoUsuarioAtualizado.TituloTipoUsuario;
            }

            ctx.TiposUsuarios.Update(tipoUsuarioBuscado);

            ctx.SaveChanges();

        }


        public TiposUsuario BuscarTipoUsuarioPorId(int id)
        {
            return ctx.TiposUsuarios.FirstOrDefault(t => t.IdTipoUsuario == id);
        }



        public void CadastrarTipoUsuario(TiposUsuario novoTipoUsuario)
        {
            ctx.TiposUsuarios.Add(novoTipoUsuario);

            ctx.SaveChanges();
        }



        public void DeletarTipoUsuario(int id)
        {
            ctx.TiposUsuarios.Remove(BuscarTipoUsuarioPorId(id));

            ctx.SaveChanges();
        }



        public List<TiposUsuario> ListarTiposUsuarios()
        {
            return ctx.TiposUsuarios.ToList();
        }


    }
}
