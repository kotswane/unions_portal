using System.Collections.Generic;
using System.Threading.Tasks;

namespace CompliancePortal.Services.Member
{
    public interface IMemberService
    {
        Task<IEnumerable<Models.BranchMembers>> GetAllMembersAsync();
        Task<Models.BranchMembers> GetMemberByIdAsync(long id);
        Task AddMemberAsync(Models.BranchMembers member);
        Task UpdateMemberAsync(Models.BranchMembers member);
        Task DeleteMemberAsync(long id);

        Task<IEnumerable<Models.BranchMembers>> GetMembersByBranchIdAsync(long branchId); // New method
    }
}
