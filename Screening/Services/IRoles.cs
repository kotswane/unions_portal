using CompliancePortal.Pages;
using System.Threading.Tasks;

namespace CompliancePortal.Services
{
    public interface IRoles
    {
        Task GenerateRolesFromPagesAsync();

        Task AddToRoles(string applicationUserId);
        Task<MainMenuViewModel> RolebaseMenuLoad(string applicationUserId);
    }
}
