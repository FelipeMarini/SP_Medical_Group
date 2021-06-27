using SpMedicalGroup.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.webAPI.Interfaces
{
    interface IPacienteRepository
    {
        List<Paciente> ListarPacientes();

        Paciente BuscarPacientePorId(int id);

        void CadastrarPaciente(Paciente novoPaciente);

        void AtualizarUrlPaciente(int id, Paciente pacienteAtualizado);

        void DeletarPaciente(int id);
    }
}
