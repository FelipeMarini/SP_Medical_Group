using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SpMedicalGroup.webAPI.ViewModels
{
    public class LoginViewModel
    {

        [Required(ErrorMessage = "informe um email de usuário")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }


        [Required(ErrorMessage = "informe uma senha de usuário")]
        [DataType(DataType.Password)]
        public string Senha { get; set; }


    }

}