using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;
using UAParser;
using CompliancePortal.Models;
using CompliancePortal.Models.UserAccountViewModel;

namespace CompliancePortal.Services
{
    public interface ICommon
    {
        string UploadedFile(IFormFile ProfilePicture);
        Task<SMTPEmailSetting> GetSMTPEmailSetting();
        Task<SendGridSetting> GetSendGridEmailSetting();
        UserProfile GetByUserProfile(Int64 id);
        UserProfileCRUDViewModel GetByUserProfileInfo(Int64 id);
        bool InsertLoginHistory(LoginHistory _LoginHistory, ClientInfo _ClientInfo);
        Task<UpdateRoleViewModel> GetRoleByUser(string _ApplicationUserId, UserManager<ApplicationUser> _userManager, RoleManager<IdentityRole> _roleManager);
    }
}
