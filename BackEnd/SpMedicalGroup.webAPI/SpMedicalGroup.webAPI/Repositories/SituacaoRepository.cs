using SpMedicalGroup.webAPI.Context;
using SpMedicalGroup.webAPI.Domains;
using SpMedicalGroup.webAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.webAPI.Repositories
{
    
        public class SituacaoRepository : ISituacaoRepository
        {

            SpMedicalGroupContext ctx = new SpMedicalGroupContext();


            public void AtualizarUrlSituacao(int id, Situacao situacaoAtualizada)
            {
                Situacao situacaoBuscada = BuscarSituacaoPorId(id);

                if (situacaoAtualizada.DescricaoSituacao != null)
                {
                    situacaoBuscada.DescricaoSituacao = situacaoAtualizada.DescricaoSituacao;
                }

                ctx.Situacoes.Update(situacaoBuscada);

                ctx.SaveChanges();

            }


            public Situacao BuscarSituacaoPorId(int id)
            {
                return ctx.Situacoes.FirstOrDefault(s => s.IdSituacao == id);
            }


            public void CadastrarSituacao(Situacao novaSituacao)
            {
                ctx.Situacoes.Add(novaSituacao);

                ctx.SaveChanges();
            }

            public void DeletarSituacao(int id)
            {
                ctx.Situacoes.Remove(BuscarSituacaoPorId(id));

                ctx.SaveChanges();
            }

            public List<Situacao> ListarSituacoes()
            {
                return ctx.Situacoes.ToList();
            }


        }
    
}
