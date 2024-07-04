using CompliancePortal.Models.UserAccountViewModel;
using System.Collections.Generic;

namespace CompliancePortal.Models
{
    public class MemberApplicationUser
    {
        public BranchMembers Member { get; set; }
        public UserProfileViewModel UserProfileViewModel { get; set; }
        public List<Employer> Employers { get; set; }
    }
}
