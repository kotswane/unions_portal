using System.ComponentModel.DataAnnotations;

namespace CompliancePortal.Models
{
    public class Branch
    {
        [Key]
        public long BranchId { get; set; }

        [Required]
        [StringLength(50)]
        public string BranchName { get; set; }
        [Required]
        public int RegionId { get; set; }
    }
}
