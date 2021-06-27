using SpMedicalGroup.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.webAPI.Interfaces
{
    interface IMedicoRepository
    {
        List<Medico> ListarMedicos();

        Medico BuscarMedicoPorId(int id);

        void CadastrarMedico(Medico novoMedico);

        void AtualizarUrlMedico(int id, Medico medicoAtualizado);

        void DeletarMedico(int id);
    }
}
