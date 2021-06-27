using SpMedicalGroup.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.webAPI.Interfaces
{
    interface ITiposUsuarioRepository
    {
        List<TiposUsuario> ListarTiposUsuarios();

        TiposUsuario BuscarTipoUsuarioPorId(int id);

        void CadastrarTipoUsuario(TiposUsuario novoTipoUsuario);

        void AtualizarUrlTipoUsuario(int id, TiposUsuario tipoUsuarioAtualizado);

        void DeletarTipoUsuario(int id);
    }
}
