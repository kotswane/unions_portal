using CompliancePortal.Models;
using CompliancePortal.Repository.AsyncInterface;
using System.Collections.Generic;
using System.Threading.Tasks;
using static CompliancePortal.Pages.MainMenu;

namespace CompliancePortal.Services
{
    public class EmployerService:IEmployerService
    {
        private readonly IEmployerRepository _employerRepository;

        public EmployerService(IEmployerRepository employerRepository)
        {
            _employerRepository = employerRepository;
        }

        public async Task<long> CreateEmployer(Models.Employer employer)
        {
            return await _employerRepository.CreateEmployer(employer);
        }

        public async Task<int> DeleteEmployer(long id)
        {
            return await _employerRepository.DeleteEmployer(id);
        }

        public async Task<IEnumerable<Models.Employer>> GetAllEmployers()
        {
            return await _employerRepository.GetAllEmployers();
        }

        public async Task<Models.Employer> GetEmployerById(long id)
        {
            return await _employerRepository.GetEmployerById(id);
        }

        public async Task<int> UpdateEmployer(Models.Employer employer)
        {
            return await _employerRepository.UpdateEmployer(employer);
        }
    }
}
