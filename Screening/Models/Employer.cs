using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace CompliancePortal.Models
{
    public class Employer
    {
        [Key]
        public long EmployerId { get; set; }

        [Required]
        [StringLength(50)]
        public string EmployerName { get; set; }

        [Required]
        [StringLength(50)]
        public string EmployerAddress { get; set; }

        [Required]
        [StringLength(30)]
        public string EmployerEmail { get; set; }

        [Required]
        [StringLength(13)]
        public string EmployerContactNumber { get; set; }

        public ICollection<BranchMembers> Members { get; set; }
    }
}
