using SpMedicalGroup.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.webAPI.Interfaces
{
    interface IClinicaRepository
    {
        List<Clinica> ListarClinicas();

        Clinica BuscarClinicaPorId(int id);

        void CadastrarClinica(Clinica novaClinica);

        void AtualizarUrlClinica(int id, Clinica clinicaAtualizada);

        void DeletarClinica(int id);
    }
}
