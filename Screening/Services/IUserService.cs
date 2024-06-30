using System;
using System.Threading.Tasks;
using CompliancePortal.Models;

namespace CompliancePortal.Services
{
    public interface IUserService
    {
        Task<UserLinkToEntityDTO> GetApplicationUserLinkToEntity(string email);
    }
}
