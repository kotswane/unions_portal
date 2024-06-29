using System.Linq;
using System.Threading.Tasks;
using CompliancePortal.Services;

namespace CompliancePortal.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(ApplicationDbContext context, IFunctional functional)
        {
            context.Database.EnsureCreated();
            await functional.GetDefaultIdentitySettings();

            if (context.ApplicationUser.Any())
            {
                return;
            }
            else
            {
                await functional.CreateDefaultSuperAdmin();
                await functional.CreateDefaultOtherUser();
                await functional.CreateDefaultEmailSettings();
                await functional.CreateDefaultIdentitySettings();
            }
        }
    }
}
