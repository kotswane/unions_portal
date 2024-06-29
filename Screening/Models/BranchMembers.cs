using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CompliancePortal.Models
{
    public class BranchMembers
    {
        [Key]
        public long MemberId { get; set; }

        [Required]
        [StringLength(20)]
        public string MemberFirstname { get; set; }

        [StringLength(20)]
        public string MemberMiddleName { get; set; }

        [Required]
        [StringLength(20)]
        public string MemberSurname { get; set; }

        [Required]
        [StringLength(13)]
        public string MemberIdNumber { get; set; }

        [Required]
        [StringLength(50)]
        public string MemberAddress { get; set; }

        [Required]
        [StringLength(13)]
        public string MemberContactNumber { get; set; }

        [ForeignKey("MemberEmployerId")]
        public long MemberEmployerId { get; set; }
        public Employer Employer { get; set; }

        [ForeignKey("MemberBranchId")]
        public long MemberBranchId { get; set; }
        public Branch Branch { get; set; }
    }
}
