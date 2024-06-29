using CompliancePortal.Repository.Interface;
using CompliancePortal.Services.Branch.Interface;
using System.Collections.Generic;

namespace CompliancePortal.Services
{
    public class BranchService : IBranchService
    {
        private readonly IRepository<Models.Branch> branchRepository;

        public BranchService(IRepository<Models.Branch> branchRepository)
        {
            this.branchRepository = branchRepository;
        }

        public IEnumerable<Models.Branch> GetAllBranches()
        {
            return branchRepository.GetAll();
        }

        public Models.Branch GetBranchById(long id)
        {
            return branchRepository.GetById(id);
        }

        public int CreateBranch(Models.Branch branch)
        {
            branchRepository.Insert(branch);
            return branchRepository.Save();
        }

        public int UpdateBranch(Models.Branch branch)
        {
            branchRepository.Update(branch);
            return branchRepository.Save();
        }

        public int DeleteBranch(long id)
        {
            branchRepository.Delete(id);
            return branchRepository.Save();
        }
    }

}
