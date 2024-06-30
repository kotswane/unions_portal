using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace CompliancePortal.Models
{
    public class BranchMembers
    {
        [Key]
        public long MemberId { get; set; }

        [Required]
        [StringLength(20)]
        [DisplayName("Firstname")]
        public string MemberFirstname { get; set; }

        [StringLength(20)]
        [DisplayName("Middlename")]
        public string MemberMiddleName { get; set; }

        [Required]
        [StringLength(20)]
        [DisplayName("Surname")]
        public string MemberSurname { get; set; }

        [Required]
        [StringLength(13)]
        [DisplayName("Identity Number")]
        public string MemberIdNumber { get; set; }

        [Required]
        [StringLength(50)]
        [DisplayName("Address")]
        public string MemberAddress { get; set; }

        [Required]
        [StringLength(13)]
        [DisplayName("Phone Number")]
        public string MemberContactNumber { get; set; }

        [ForeignKey("MemberEmployerId")]
        [DisplayName("Employer")]
        public long MemberEmployerId { get; set; }
        public Employer Employer { get; set; }

        [ForeignKey("MemberBranchId")]
        public long MemberBranchId { get; set; }
        public Branch Branch { get; set; }
    }
}
