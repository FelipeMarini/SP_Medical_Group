using SpMedicalGroup.webAPI.Context;
using SpMedicalGroup.webAPI.Domains;
using SpMedicalGroup.webAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.webAPI.Repositories
{
    public class ClinicaRepository : IClinicaRepository
    {

        SpMedicalGroupContext ctx = new SpMedicalGroupContext();


        public void AtualizarUrlClinica(int id, Clinica clinicaAtualizada)
        {
            Clinica clinicaBuscada = BuscarClinicaPorId(id);

            if (clinicaAtualizada.NomeClinica != null)
            {
                clinicaBuscada.NomeClinica = clinicaAtualizada.NomeClinica;
            }

            if (clinicaAtualizada.Cnpj != null)
            {
                clinicaBuscada.Cnpj = clinicaAtualizada.Cnpj;
            }

            if (clinicaAtualizada.RazaoSocial != null)
            {
                clinicaBuscada.RazaoSocial = clinicaAtualizada.RazaoSocial;
            }

            if (clinicaAtualizada.HorarioAbertura != null)
            {
                clinicaBuscada.HorarioAbertura = clinicaAtualizada.HorarioAbertura;
            }

            if (clinicaAtualizada.HorarioFechamento != null)
            {
                clinicaBuscada.HorarioFechamento = clinicaAtualizada.HorarioFechamento;
            }

            ctx.Clinicas.Update(clinicaBuscada);

            ctx.SaveChanges();

        }


        public Clinica BuscarClinicaPorId(int id)
        {
            return ctx.Clinicas.FirstOrDefault(c => c.IdClinica == id);
        }


        public void CadastrarClinica(Clinica novaClinica)
        {
            ctx.Clinicas.Add(novaClinica);

            ctx.SaveChanges();
        }


        public void DeletarClinica(int id)
        {
            ctx.Clinicas.Remove(BuscarClinicaPorId(id));

            ctx.SaveChanges();
        }


        public List<Clinica> ListarClinicas()
        {
            return ctx.Clinicas.ToList();
        }


    }
}
