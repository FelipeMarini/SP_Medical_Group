using SpMedicalGroup.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.webAPI.Interfaces
{
    interface IEspecialidadeRepository
    {
        List<Especialidade> ListarEspecialidades();

        Especialidade BuscarEspecialidadePorId(int id);

        void CadastrarEspecialidade(Especialidade novaEspecialidade);

        void AtualizarUrlEspecialidade(int id, Especialidade especialidadeAtualizada);

        void DeletarEspecialidade(int id);
    }
}
