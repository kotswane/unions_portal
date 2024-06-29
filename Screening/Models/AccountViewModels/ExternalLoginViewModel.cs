using System.ComponentModel.DataAnnotations;

namespace CompliancePortal.Models.AccountViewModels
{
    public class ExternalLoginViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
