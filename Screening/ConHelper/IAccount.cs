using CompliancePortal.Models;
using CompliancePortal.Models.UserAccountViewModel;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;
using CompliancePortal.Models.AccountViewModels;

namespace CompliancePortal.ConHelper
{
    public interface IAccount
    {
        Task<Tuple<ApplicationUser, IdentityResult>> CreateUserAccount(CreateUserAccountViewModel _CreateUserAccountViewModel);
        Task<Tuple<ApplicationUser, string>> CreateUserProfile(UserProfileViewModel vm, string LoginUser);
    }
}
