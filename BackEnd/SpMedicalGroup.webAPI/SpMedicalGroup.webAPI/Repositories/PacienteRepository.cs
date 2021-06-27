using SpMedicalGroup.webAPI.Context;
using SpMedicalGroup.webAPI.Domains;
using SpMedicalGroup.webAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.webAPI.Repositories
{
    
        public class PacienteRepository : IPacienteRepository
        {

            SpMedicalGroupContext ctx = new SpMedicalGroupContext();

            public void AtualizarUrlPaciente(int id, Paciente pacienteAtualizado)
            {
                Paciente pacienteBuscado = BuscarPacientePorId(id);

                if (pacienteAtualizado.IdUsuario != null)
                {
                    pacienteBuscado.IdUsuario = pacienteAtualizado.IdUsuario;
                }

                if (pacienteAtualizado.NomePaciente != null)
                {
                    pacienteBuscado.NomePaciente = pacienteAtualizado.NomePaciente;
                }


                pacienteBuscado.DataNascimento = pacienteAtualizado.DataNascimento;


                if (pacienteAtualizado.Telefone != null)
                {
                    pacienteBuscado.Telefone = pacienteAtualizado.Telefone;
                }

                if (pacienteAtualizado.Rg != null)
                {
                    pacienteBuscado.Rg = pacienteAtualizado.Rg;
                }

                if (pacienteAtualizado.Cpf != null)
                {
                    pacienteBuscado.Cpf = pacienteAtualizado.Cpf;
                }

                if (pacienteAtualizado.Endereco != null)
                {
                    pacienteBuscado.Endereco = pacienteAtualizado.Endereco;
                }

                ctx.Pacientes.Update(pacienteBuscado);

                ctx.SaveChanges();

            }



            public Paciente BuscarPacientePorId(int id)
            {
                return ctx.Pacientes.FirstOrDefault(p => p.IdPaciente == id);
            }



            public void CadastrarPaciente(Paciente novoPaciente)
            {
                ctx.Pacientes.Add(novoPaciente);

                ctx.SaveChanges();
            }



            public void DeletarPaciente(int id)
            {
                ctx.Pacientes.Remove(BuscarPacientePorId(id));

                ctx.SaveChanges();
            }



            public List<Paciente> ListarPacientes()
            {
                return ctx.Pacientes.ToList();
            }


        }
    
}
