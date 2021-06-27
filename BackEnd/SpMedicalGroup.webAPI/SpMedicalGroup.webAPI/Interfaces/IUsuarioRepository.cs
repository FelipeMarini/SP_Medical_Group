using SpMedicalGroup.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.webAPI.Interfaces
{
    interface IUsuarioRepository
    {
        List<Usuario> ListarUsuarios();

        Usuario BuscarUsuarioPorId(int id);

        void CadastrarUsuario(Usuario novoUsuario);

        void AtualizarUrlUsuario(int id, Usuario usuarioAtualizado);

        void DeletarUsuario(int id);

        Usuario Login(string email, string senha);
    }
}
