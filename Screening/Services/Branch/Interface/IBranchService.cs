using System.Collections.Generic;

namespace CompliancePortal.Services.Branch.Interface
{
    public interface IBranchService
    {
        IEnumerable<Models.Branch> GetAllBranches();
        Models.Branch GetBranchById(long id);
        int CreateBranch(Models.Branch branch);
        int UpdateBranch(Models.Branch branch);
        int DeleteBranch(long id);
    }
}
