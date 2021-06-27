using SpMedicalGroup.webAPI.Context;
using SpMedicalGroup.webAPI.Domains;
using SpMedicalGroup.webAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.webAPI.Repositories
{
    public class MedicoRepository : IMedicoRepository
    {

        SpMedicalGroupContext ctx = new SpMedicalGroupContext();

        public void AtualizarUrlMedico(int id, Medico medicoAtualizado)
        {
            Medico medicoBuscado = BuscarMedicoPorId(id);

            if (medicoAtualizado.IdClinica != null)
            {
                medicoBuscado.IdClinica = medicoAtualizado.IdClinica;
            }

            if (medicoAtualizado.IdEspecialidade != null)
            {
                medicoBuscado.IdEspecialidade = medicoAtualizado.IdEspecialidade;
            }

            if (medicoAtualizado.IdUsuario != null)
            {
                medicoBuscado.IdUsuario = medicoAtualizado.IdUsuario;
            }

            if (medicoAtualizado.NomeMedico != null)
            {
                medicoBuscado.NomeMedico = medicoAtualizado.NomeMedico;
            }

            if (medicoAtualizado.Crm != null)
            {
                medicoBuscado.Crm = medicoAtualizado.Crm;
            }

            ctx.Medicos.Update(medicoBuscado);

            ctx.SaveChanges();

        }


        public Medico BuscarMedicoPorId(int id)
        {
            return ctx.Medicos.FirstOrDefault(m => m.IdMedico == id);
        }

        public void CadastrarMedico(Medico novoMedico)
        {
            ctx.Medicos.Add(novoMedico);

            ctx.SaveChanges();
        }


        public void DeletarMedico(int id)
        {
            ctx.Medicos.Remove(BuscarMedicoPorId(id));

            ctx.SaveChanges();
        }


        public List<Medico> ListarMedicos()
        {
            return ctx.Medicos.ToList();
        }


    }
}
