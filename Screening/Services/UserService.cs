using CompliancePortal.Models;
using CompliancePortal.Repository;
using System;
using System.Threading.Tasks;

namespace CompliancePortal.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationUserRepository applicationUserRepository;
        public UserService(ApplicationUserRepository applicationUserRepository) => this.applicationUserRepository = applicationUserRepository;

        public async Task<UserLinkToEntityDTO> GetApplicationUserLinkToEntity(string email)
        {
            return await applicationUserRepository.GetApplicationUserLinkToEntity(email);
        }
    }
}
