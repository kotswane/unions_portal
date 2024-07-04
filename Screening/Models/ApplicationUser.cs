using Microsoft.AspNetCore.Identity;

namespace CompliancePortal.Models
{
    public class ApplicationUser : IdentityUser
    {
        public int? LinkToEntityTypeId { get; set; }
        public string? LinkToEntityTypeValue { get; set; }
    }
}
