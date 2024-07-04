using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace CompliancePortal.Models
{
    public class BranchMembersDTO
    {

        public long MemberId { get; set; }

        [DisplayName("Firstname")]
        public string MemberFirstname { get; set; }
        [DisplayName("Middlename")]
        public string MemberMiddleName { get; set; }
        [DisplayName("Surname")]
        public string MemberSurname { get; set; }
        [DisplayName("Identity Number")]
        public string MemberIdNumber { get; set; }

        [DisplayName("Address")]
        public string MemberAddress { get; set; }
        [DisplayName("Phone Number")]
        public string MemberContactNumber { get; set; }

        [DisplayName("Employer")]
        public string MemberEmployer { get; set; }

        [DisplayName("Branch")]
        public string MemberBranch { get; set; }
    }
}
