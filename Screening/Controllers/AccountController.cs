﻿using CompliancePortal.Data;
using CompliancePortal.Models;
using CompliancePortal.Models.AccountViewModels;
using CompliancePortal.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Security.Claims;
using System.Threading.Tasks;
using UAParser;
using System.Linq;
using CompliancePortal.Models.UserAccountViewModel;
using Microsoft.EntityFrameworkCore;
using CompliancePortal.Models.DashboardViewModel;
using Microsoft.AspNetCore.Http;
using System.Net.Mail;
using System.Net;
using System.Text;

namespace CompliancePortal.Controllers
{
    [Authorize]
    [Route("[controller]/[action]")]
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ApplicationDbContext _context;
        private readonly IEmailSender _emailSender;
        private readonly ILogger _logger;
        private readonly ICommon _iCommon;
        private readonly IUserService _userService;
        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ApplicationDbContext context,
            IEmailSender emailSender,
            ILogger<AccountController> logger,
            ICommon iCommon,
            IUserService userService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
            _emailSender = emailSender;
            _logger = logger;
            _iCommon = iCommon;
            _userService = userService;
        }

        [TempData]
        public string ErrorMessage { get; set; }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Login(string returnUrl = null)
        {
            // Clear the existing external cookie to ensure a clean login process
            await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);

            ViewData["ReturnUrl"] = returnUrl;
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginViewModel model, string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            if (ModelState.IsValid)
            {
                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: true);

                InserLoginHistory(true, result.Succeeded, model);

                if (result.Succeeded /* && result.RequiresTwoFactor == false*/)
                {
                    ViewBag.IsLoginSucceeded = result.Succeeded;
                    _logger.LogInformation("User logged in.");

                    var accountLinkedToEntity = await _userService.GetApplicationUserLinkToEntity(model.Email);
                    HttpContext.Session.SetString("UserId", accountLinkedToEntity.UserId.ToString());
                    HttpContext.Session.SetString("LinkToEntityTypeId", accountLinkedToEntity.LinkToEntityTypeId.ToString());
                    HttpContext.Session.SetString("LinkToEntityTypeValue", accountLinkedToEntity.LinkToEntityTypeValue.ToString());
                    // return RedirectToAction("EnableAuthenticator", "Manage");
                    return RedirectToAction("Index", "UserManagement");
                }
                if (result.RequiresTwoFactor)
                {
                    return RedirectToAction(nameof(LoginWith2fa), new { returnUrl, model.RememberMe });
                }
                if (result.IsLockedOut)
                {
                    _logger.LogWarning("User account locked out.");
                    return RedirectToAction(nameof(Lockout));
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                    ViewBag.IsLoginSucceeded = "Invalid login attempt.";
                    return View(model);
                }
            }
            return View(model);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> LoginWith2fa(bool rememberMe, string returnUrl = null)
        {
            // Ensure the user has gone through the username & password screen first
            var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();

            if (user == null)
            {
                throw new ApplicationException($"Unable to load two-factor authentication user.");
            }

            var model = new LoginWith2faViewModel { RememberMe = rememberMe };
            ViewData["ReturnUrl"] = returnUrl;

            return View(model);
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> LoginWith2fa(LoginWith2faViewModel model, bool rememberMe, string returnUrl = null)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();
            if (user == null)
            {
                throw new ApplicationException($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            var authenticatorCode = model.TwoFactorCode.Replace(" ", string.Empty).Replace("-", string.Empty);

            var result = await _signInManager.TwoFactorAuthenticatorSignInAsync(authenticatorCode, rememberMe, model.RememberMachine);

            if (result.Succeeded)
            {
                _logger.LogInformation("User with ID {UserId} logged in with 2fa.", user.Id);
                return RedirectToLocal(returnUrl);
            }
            else if (result.IsLockedOut)
            {
                _logger.LogWarning("User with ID {UserId} account locked out.", user.Id);
                return RedirectToAction(nameof(Lockout));
            }
            else
            {
                _logger.LogWarning("Invalid authenticator code entered for user with ID {UserId}.", user.Id);
                ModelState.AddModelError(string.Empty, "Invalid authenticator code.");
                return View();
            }
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> LoginWithRecoveryCode(string returnUrl = null)
        {
            // Ensure the user has gone through the username & password screen first
            var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();
            if (user == null)
            {
                throw new ApplicationException($"Unable to load two-factor authentication user.");
            }

            ViewData["ReturnUrl"] = returnUrl;

            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> LoginWithRecoveryCode(LoginWithRecoveryCodeViewModel model, string returnUrl = null)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();
            if (user == null)
            {
                throw new ApplicationException($"Unable to load two-factor authentication user.");
            }

            var recoveryCode = model.RecoveryCode.Replace(" ", string.Empty);

            var result = await _signInManager.TwoFactorRecoveryCodeSignInAsync(recoveryCode);

            if (result.Succeeded)
            {
                _logger.LogInformation("User with ID {UserId} logged in with a recovery code.", user.Id);
                return RedirectToLocal(returnUrl);
            }
            if (result.IsLockedOut)
            {
                _logger.LogWarning("User with ID {UserId} account locked out.", user.Id);
                return RedirectToAction(nameof(Lockout));
            }
            else
            {
                _logger.LogWarning("Invalid recovery code entered for user with ID {UserId}", user.Id);
                ModelState.AddModelError(string.Empty, "Invalid recovery code entered.");
                return View();
            }
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Lockout()
        {
            return View();
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Register(string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(RegisterViewModel model, string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            // if (ModelState.IsValid)
            {
                var _ApplicationUser = new ApplicationUser
                {
                    UserName = model.Email,
                    PhoneNumber = model.PhoneNumber,
                    PhoneNumberConfirmed = true,
                    Email = model.Email,
                    EmailConfirmed = false
                };
                var result = await _userManager.CreateAsync(_ApplicationUser, model.Password);
                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(_ApplicationUser, "Dashboard");
                    await _userManager.AddToRoleAsync(_ApplicationUser, "User Profile");

                    //Insert: UserProfile
                    UserProfile _UserProfile = new UserProfile
                    {
                        FirstName = model.FirstName,
                        LastName = model.LastName,
                        PhoneNumber = model.PhoneNumber,
                        Email = model.Email,
                        Address = model.Address,
                        Country = model.Country,

                        PasswordHash = _ApplicationUser.PasswordHash,
                        ConfirmPassword = _ApplicationUser.PasswordHash,
                        ApplicationUserId = _ApplicationUser.Id,

                        CreatedDate = DateTime.Now,
                        ModifiedDate = DateTime.Now,
                        CreatedBy = HttpContext.User.Identity.Name,
                        ModifiedBy = HttpContext.User.Identity.Name
                    };
                    var result2 = await _context.UserProfile.AddAsync(_UserProfile);
                    _context.SaveChanges();
                    _logger.LogInformation("User created a new account with password.");

                    var _DefaultIdentityOptions = await _context.DefaultIdentityOptions.FirstOrDefaultAsync(m => m.Id == 1);
                    if (_DefaultIdentityOptions.SignInRequireConfirmedEmail)
                    {
                        var _ConfirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(_ApplicationUser);
                        var callbackUrl = Url.EmailConfirmationLink(_ApplicationUser.Id, _ConfirmationToken, Request.Scheme);
                        await _emailSender.SendEmailConfirmationAsync(_ApplicationUser.Email, callbackUrl);
                    }
                    await _signInManager.SignInAsync(_ApplicationUser, isPersistent: false);
                    LoginViewModel _LoginViewModel = new LoginViewModel
                    {
                        Email = model.Email,
                        Latitude = model.Latitude,
                        Longitude = model.Longitude
                    };
                    InserLoginHistory(true, true, _LoginViewModel);
                    _logger.LogInformation("User created a new account with password.");
                    return RedirectToLocal(returnUrl);
                }
                AddErrors(result);
            }
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout(LoginViewModel _LoginViewModel)
        {
            await _signInManager.SignOutAsync();

            InserLoginHistory(false, true, _LoginViewModel);
            _logger.LogInformation("User logged out.");
            return RedirectToAction(nameof(DashboardController.Index), "Dashboard");
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public IActionResult ExternalLogin(string provider, string returnUrl = null)
        {
            // Request a redirect to the external login provider.
            var redirectUrl = Url.Action(nameof(ExternalLoginCallback), "Account", new { returnUrl });
            var properties = _signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
            return Challenge(properties, provider);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> ExternalLoginCallback(string returnUrl = null, string remoteError = null)
        {
            if (remoteError != null)
            {
                ErrorMessage = $"Error from external provider: {remoteError}";
                return RedirectToAction(nameof(Login));
            }
            var info = await _signInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                return RedirectToAction(nameof(Login));
            }

            // Sign in the user with this external login provider if the user already has a login.
            var result = await _signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, isPersistent: false, bypassTwoFactor: true);
            if (result.Succeeded)
            {
                _logger.LogInformation("User logged in with {Name} provider.", info.LoginProvider);
                return RedirectToLocal(returnUrl);
            }
            if (result.IsLockedOut)
            {
                return RedirectToAction(nameof(Lockout));
            }
            else
            {
                // If the user does not have an account, then ask the user to create an account.
                ViewData["ReturnUrl"] = returnUrl;
                ViewData["LoginProvider"] = info.LoginProvider;
                var email = info.Principal.FindFirstValue(ClaimTypes.Email);
                return View("ExternalLogin", new ExternalLoginViewModel { Email = email });
            }
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ExternalLoginConfirmation(ExternalLoginViewModel model, string returnUrl = null)
        {
            if (ModelState.IsValid)
            {
                // Get the information about the user from the external login provider
                var info = await _signInManager.GetExternalLoginInfoAsync();
                if (info == null)
                {
                    throw new ApplicationException("Error loading external login information during confirmation.");
                }
                var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
                var result = await _userManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    result = await _userManager.AddLoginAsync(user, info);
                    if (result.Succeeded)
                    {
                        await _signInManager.SignInAsync(user, isPersistent: false);
                        _logger.LogInformation("User created an account using {Name} provider.", info.LoginProvider);
                        return RedirectToLocal(returnUrl);
                    }
                }
                AddErrors(result);
            }

            ViewData["ReturnUrl"] = returnUrl;
            return View(nameof(ExternalLogin), model);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
            {
                return RedirectToAction(nameof(DashboardController.Index), "Dashboard");
            }
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new ApplicationException($"Unable to load user with ID '{userId}'.");
            }
            var result = await _userManager.ConfirmEmailAsync(user, code);
            return View(result.Succeeded ? "ConfirmEmail" : "Error");
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult ForgotPassword()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user == null || !(await _userManager.IsEmailConfirmedAsync(user)))
                {
                    // Don't reveal that the user does not exist or is not confirmed
                    return RedirectToAction(nameof(ForgotPasswordConfirmation));
                }

                // For more information on how to enable account confirmation and password reset please
                // visit https://go.microsoft.com/fwlink/?LinkID=532713
                var code = await _userManager.GeneratePasswordResetTokenAsync(user);
                var callbackUrl = Url.ResetPasswordCallbackLink(user.Id, code, Request.Scheme);
                var result = await _emailSender.SendEmailAsync(model.Email, "Reset Password",
                   $"Please reset your password by clicking here: <a href='{callbackUrl}'>link</a>");
                return RedirectToAction(nameof(ForgotPasswordConfirmation));
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult ForgotPasswordConfirmation()
        {
            return View();
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult ResetPassword(string code = null)
        {
            if (code == null)
            {
                throw new ApplicationException("A code must be supplied for password reset.");
            }
            var model = new ResetPasswordViewModel { Code = code };
            return View(model);
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user == null)
                {
                    // Don't reveal that the user does not exist
                    return RedirectToAction(nameof(ResetPasswordConfirmation));
                }
                var result = await _userManager.ResetPasswordAsync(user, model.Code, model.NewPassword);
                if (result.Succeeded)
                {
                    return RedirectToAction(nameof(ResetPasswordConfirmation));
                }
                AddErrors(result);
                return View();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult ResetPasswordConfirmation()
        {
            return View();
        }


        [HttpGet]
        public IActionResult AccessDenied()
        {
            return View();
        }

        private void InserLoginHistory(bool IsLoginAction, bool _IsSuccess, LoginViewModel _LoginViewModel)
        {
            var _Headers = HttpContext.Request.Headers["User-Agent"];
            var _Parser = Parser.GetDefault();
            ClientInfo _ClientInfo = _Parser.Parse(_Headers);

            LoginHistory vm = new LoginHistory
            {
                Browser = _ClientInfo.UA.Family,
                OperatingSystem = _ClientInfo.OS.Family,
                Device = _ClientInfo.Device.Family,
                ActionStatus = _IsSuccess == true ? "Success" : "Failed",
                Latitude = _LoginViewModel.Latitude,
                Longitude = _LoginViewModel.Longitude,
            };

            if (IsLoginAction)
            {
                vm.UserName = _LoginViewModel.Email;
                vm.LoginTime = DateTime.Now;
                vm.Duration = 0;
                vm.Action = "Login";

                vm.CreatedBy = _LoginViewModel.Email;
                vm.ModifiedBy = _LoginViewModel.Email;
            }
            else
            {
                string _UserName = HttpContext.User.Identity.Name;
                var _LoginHistory = _context.LoginHistory.Where(x => x.UserName == _UserName && x.Action == "Login").OrderByDescending(x => x.CreatedDate).Take(1).SingleOrDefault();
                vm.UserName = _UserName;
                vm.LoginTime = _LoginHistory.LoginTime; //Bug null
                vm.LogoutTime = DateTime.Now;
                vm.Duration = (DateTime.Now - _LoginHistory.LoginTime).TotalMinutes;
                vm.Action = "Logout";

                vm.CreatedBy = _UserName;
                vm.ModifiedBy = _UserName;
            }
            _iCommon.InsertLoginHistory(vm, _ClientInfo);
        }

        #region Helpers

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }

        private IActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction(nameof(DashboardController.Index), "Dashboard");
            }
        }

        #endregion
    }
}
