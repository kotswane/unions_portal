using CompliancePortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CompliancePortal.Services
{
    public interface IEmployerService
    {
        Task<IEnumerable<Employer>> GetAllEmployers();
        Task<int> DeleteEmployer(long id);
        Task<int> UpdateEmployer(Employer employer);
        Task<long> CreateEmployer(Employer employer);
        Task<Employer> GetEmployerById(long id);
    }
}
