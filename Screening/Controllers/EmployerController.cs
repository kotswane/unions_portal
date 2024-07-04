using CompliancePortal.ConHelper;
using CompliancePortal.Data;
using CompliancePortal.Models;
using CompliancePortal.Models.CommonViewModel;
using CompliancePortal.Models.UserAccountViewModel;
using CompliancePortal.Services;
using CompliancePortal.Services.Branch.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static CompliancePortal.Pages.MainMenu;
using static Microsoft.AspNetCore.Razor.Language.TagHelperMetadata;

namespace CompliancePortal.Controllers
{
    [Authorize]
    [Route("[controller]/[action]")]
    public class EmployerController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IEmployerService employerService;
        public EmployerController(UserManager<ApplicationUser> userManager,
            IEmployerService employerService) {
            _userManager = userManager;
            this.employerService = employerService;
        }

        [Authorize(Roles = UserManagement.RoleName)]
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
        
        
        [HttpPost]
        public async Task<IActionResult> GetAllEmployers()
        {

            try
            {
                var draw = HttpContext.Request.Form["draw"].FirstOrDefault();
                var start = Request.Form["start"].FirstOrDefault();
                var length = Request.Form["length"].FirstOrDefault();

                var sortColumn = Request.Form["columns[" + Request.Form["order[0][column]"].FirstOrDefault() + "][name]"].FirstOrDefault();
                var sortColumnAscDesc = Request.Form["order[0][dir]"].FirstOrDefault();
                var searchValue = Request.Form["search[value]"].FirstOrDefault();

                int pageSize = length != null ? Convert.ToInt32(length) : 0;
                int skip = start != null ? Convert.ToInt32(start) : 0;
                int resultTotal = 0;

                var employers = await employerService.GetAllEmployers();

                //Search
                if (!string.IsNullOrEmpty(searchValue))
                {
                    searchValue = searchValue.ToLower();
                    employers = employers.Where(obj => obj.EmployerName.ToLower().Contains(searchValue));
                }

                resultTotal = employers.Count();

                var result = employers.Skip(skip).Take(pageSize).ToList();
                return Json(new { draw = draw, recordsFiltered = resultTotal, recordsTotal = resultTotal, data = employers });

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        
        [HttpGet]
        public async Task<IActionResult> GetEmployerById(long id)
        {
  
            var employer = await employerService.GetEmployerById(id);
            return Json(new { data = employer });
        }

       
        [HttpDelete]
        public async Task<IActionResult> DeleteEmployer(long id)
        {
            
            var result = await employerService.DeleteEmployer(id);
      
            return Json(new { data = "Success" });
        }

    
       
        [HttpGet]
        public async Task<IActionResult> CreateEmployer(long id)
        {
            
            Models.Employer _employerViewModel = new Models.Employer();
            if (id > 0)
            {
                _employerViewModel = await employerService.GetEmployerById(id);
                return PartialView("_EditEmployer", _employerViewModel);
            }
            return PartialView("_AddEmployer", _employerViewModel);
        }

        
        [HttpPost]
        public async Task<JsonResult> CreateEmployer(Models.Employer employer)
        {
            JsonResultViewModel _JsonResultViewModel = new JsonResultViewModel();
            try
            {

                if (employer.EmployerId == 0)
                {
                    var result = await employerService.CreateEmployer(employer);

                    _JsonResultViewModel.AlertMessage = "Employer Created Successfully. Employer Name: " + employer.EmployerName;
                    //_JsonResultViewModel.CurrentURL = _UserProfileViewModel.CurrentURL;
                    _JsonResultViewModel.IsSuccess = true;
                    return new JsonResult(_JsonResultViewModel);

                }
                else
                {
                    var result = await employerService.UpdateEmployer(employer);
                    _JsonResultViewModel.AlertMessage = "Employer Update Successfully. Employer Name: " + employer.EmployerName;
                    //_JsonResultViewModel.CurrentURL = _UserProfileViewModel.CurrentURL;
                    _JsonResultViewModel.IsSuccess = true;
                    return new JsonResult(_JsonResultViewModel);
                }
            }
            catch (Exception ex)
            {
                _JsonResultViewModel.IsSuccess = false;
                return new JsonResult(ex.Message);
                throw ex;
            }
        }
    }
}
