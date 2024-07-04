using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
namespace CompliancePortal.Models
{
    public class Employer
    {
        [Key]
        public long EmployerId { get; set; }

        [Required]
        [StringLength(50)]
        [DisplayName("Name")]
        public string EmployerName { get; set; }

        [Required]
        [StringLength(50)]
        [DisplayName("Address")]
        public string EmployerAddress { get; set; }

        [Required]
        [StringLength(30)]
        [DisplayName("Email")]
        public string EmployerEmail { get; set; }

        [Required]
        [StringLength(13)]
        [DisplayName("Phone Number")]
        public string EmployerContactNumber { get; set; }
    }
}
