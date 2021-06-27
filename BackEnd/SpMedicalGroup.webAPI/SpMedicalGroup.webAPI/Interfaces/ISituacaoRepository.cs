using SpMedicalGroup.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.webAPI.Interfaces
{
    interface ISituacaoRepository
    {
        List<Situacao> ListarSituacoes();

        Situacao BuscarSituacaoPorId(int id);

        void CadastrarSituacao(Situacao novaSituacao);

        void AtualizarUrlSituacao(int id, Situacao situacaoAtualizada);

        void DeletarSituacao(int id);
    }
}
