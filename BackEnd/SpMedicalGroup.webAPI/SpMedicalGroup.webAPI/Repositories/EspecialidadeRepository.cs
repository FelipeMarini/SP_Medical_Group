using SpMedicalGroup.webAPI.Context;
using SpMedicalGroup.webAPI.Domains;
using SpMedicalGroup.webAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.webAPI.Repositories
{
    public class EspecialidadeRepository : IEspecialidadeRepository
    {

        SpMedicalGroupContext ctx = new SpMedicalGroupContext();

        public void AtualizarUrlEspecialidade(int id, Especialidade especialidadeAtualizada)
        {
            Especialidade especialidadeBuscada = BuscarEspecialidadePorId(id);

            if (especialidadeAtualizada.TituloEspecialidade != null)
            {
                especialidadeBuscada.TituloEspecialidade = especialidadeAtualizada.TituloEspecialidade;
            }

            ctx.Especialidades.Update(especialidadeBuscada);

            ctx.SaveChanges();

        }


        public Especialidade BuscarEspecialidadePorId(int id)
        {
            return ctx.Especialidades.FirstOrDefault(e => e.IdEspecialidade == id);
        }


        public void CadastrarEspecialidade(Especialidade novaEspecialidade)
        {
            ctx.Especialidades.Add(novaEspecialidade);

            ctx.SaveChanges();
        }


        public void DeletarEspecialidade(int id)
        {
            ctx.Especialidades.Remove(BuscarEspecialidadePorId(id));

            ctx.SaveChanges();
        }


        public List<Especialidade> ListarEspecialidades()
        {
            return ctx.Especialidades.ToList();
        }


    }
}
