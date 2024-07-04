using CompliancePortal.Models;
using CompliancePortal.Repository.AsyncInterface;
using CompliancePortal.Repository.Interface;
using CompliancePortal.Services.Member;
using System.Collections.Generic;
using System.Threading.Tasks;
using static CompliancePortal.Pages.MainMenu;

namespace CompliancePortal.Services
{
    public class MemberService : IMemberService
    {
        private readonly IMemberRepository _memberRepository;

        public MemberService(IMemberRepository memberRepository)
        {
            _memberRepository = memberRepository;
        }

        public async Task<IEnumerable<BranchMembersDTO>> GetAllAsync(long memberBranchId)
        {
            return await _memberRepository.GetAllAsync(memberBranchId);
        }

        public async Task<long> AddAsync(BranchMembers member)
        {
            return await _memberRepository.AddAsync(member);
        }        
        

        public async Task<BranchMembers> GetByIdAsync(long memberId)
        {
            return await _memberRepository.GetByIdAsync(memberId);
        }

        public async Task<int> DeleteAsync(long memberId)
        {
            return await _memberRepository.DeleteAsync(memberId);
        }

        public async Task<int> UpdateMemberAsync(BranchMembers memberId)
        {
            return await _memberRepository.UpdateMemberAsync(memberId);
        }
    }
}
