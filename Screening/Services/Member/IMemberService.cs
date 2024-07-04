using CompliancePortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CompliancePortal.Services.Member
{
    public interface IMemberService
    {

        Task<long> AddAsync(BranchMembers member);

        Task<IEnumerable<BranchMembersDTO>> GetAllAsync(long memberBranchId); // New method

        Task<BranchMembers> GetByIdAsync(long memberId);

        Task<int> DeleteAsync(long id);

        Task<int> UpdateMemberAsync(BranchMembers memberId);
    }
}
