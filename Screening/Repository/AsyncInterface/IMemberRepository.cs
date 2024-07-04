using CompliancePortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CompliancePortal.Repository.AsyncInterface
{
    public interface IMemberRepository
    {
        Task<IEnumerable<BranchMembersDTO>> GetAllAsync(long memberBranchId);
        Task<long> AddAsync(BranchMembers entity);
        Task<int> DeleteAsync(long id);
        Task<BranchMembers> GetByIdAsync(long memberId);

        Task<int> UpdateMemberAsync(BranchMembers memberId);
    }
}
