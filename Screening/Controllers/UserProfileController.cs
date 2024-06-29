using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using CompliancePortal.Data;
using CompliancePortal.Models;
using CompliancePortal.Models.UserAccountViewModel;

namespace CompliancePortal.Controllers
{
    [Authorize]
    [Route("[controller]/[action]")]   
    public class UserProfileController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public UserProfileController(UserManager<ApplicationUser> userManager,
            ApplicationDbContext context)
        {
            _context = context;
            _userManager = userManager;
        }

        [Authorize(Roles = Pages.MainMenu.UserProfile.RoleName)]
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var _ApplicationUser = await _userManager.FindByEmailAsync(HttpContext.User.Identity.Name);
            UserProfileCRUDViewModel _UserProfileCRUDViewModel = new UserProfileCRUDViewModel();
            if (_ApplicationUser.Id != null)
            {
                _UserProfileCRUDViewModel = _context.UserProfile.Where(x => x.ApplicationUserId == _ApplicationUser.Id).SingleOrDefault();
            }
            return View(_UserProfileCRUDViewModel);
        }

        [HttpGet]
        public async Task<IActionResult> ResetPasswordGeneral(string ApplicationUserId)
        {
            var _ApplicationUser = await _userManager.FindByIdAsync(ApplicationUserId);
            ResetPasswordViewModel _ResetPasswordViewModel = new ResetPasswordViewModel();
            _ResetPasswordViewModel.ApplicationUserId = _ApplicationUser.Id;
            return PartialView("_ResetPasswordGeneral", _ResetPasswordViewModel);
        }

        [HttpPost]
        public async Task<IActionResult> ResetPasswordGeneral(ResetPasswordViewModel vm)
        {
            try
            {
                string AlertMessage = string.Empty;
                var _ApplicationUser = await _userManager.FindByIdAsync(vm.ApplicationUserId);
                if (vm.NewPassword.Equals(vm.ConfirmPassword))
                {
                    var result = await _userManager.ChangePasswordAsync(_ApplicationUser, vm.OldPassword, vm.NewPassword);
                    if (result.Succeeded)
                        AlertMessage = "Change Password Succeeded. User name: " + _ApplicationUser.Email;
                    else
                    {
                        string errorMessage = string.Empty;
                        foreach (var item in result.Errors)
                        {
                            errorMessage = errorMessage + " " + item.Description;
                        }
                        AlertMessage = "error" + errorMessage;
                    }
                }
                return new JsonResult(AlertMessage);
            }
            catch (Exception ex)
            {
                return new JsonResult("error" + ex.Message);
                throw ex;
            }
        }
    }
}
