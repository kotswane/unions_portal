using CompliancePortal.Repository.AsyncInterface;
using CompliancePortal.Repository.Interface;
using CompliancePortal.Services.Member;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CompliancePortal.Services
{
    public class MemberService : IMemberService
    {
        private readonly IasyncRepository<Models.BranchMembers> _memberRepository;

        public MemberService(IasyncRepository<Models.BranchMembers> memberRepository)
        {
            _memberRepository = memberRepository;
        }

        public async Task<IEnumerable<Models.BranchMembers>> GetAllMembersAsync()
        {
            return await _memberRepository.GetAllAsync();
        }

        public async Task<Models.BranchMembers> GetMemberByIdAsync(long id)
        {
            return await _memberRepository.GetByIdAsync(id);
        }

        public async Task AddMemberAsync(Models.BranchMembers member)
        {
            await _memberRepository.AddAsync(member);
        }

        public async Task UpdateMemberAsync(Models.BranchMembers member)
        {
            await _memberRepository.UpdateAsync(member);
        }

        public async Task DeleteMemberAsync(long id)
        {
            await _memberRepository.DeleteAsync(id);
        }
        public async Task<IEnumerable<Models.BranchMembers>> GetMembersByBranchIdAsync(long branchId) // New method
        {
            return await _memberRepository.GetMembersByBranchIdAsync(branchId);
        }
    }
}
