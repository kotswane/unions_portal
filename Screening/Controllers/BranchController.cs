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
using System.Linq;
using System.Threading.Tasks;
using static CompliancePortal.Pages.MainMenu;
using static Microsoft.AspNetCore.Razor.Language.TagHelperMetadata;

namespace CompliancePortal.Controllers
{
    [Authorize]
    [Route("[controller]/[action]")]
    public class BranchController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IBranchService branchService;
        public BranchController(UserManager<ApplicationUser> userManager,
            IBranchService branchService) {
            _userManager = userManager;
            this.branchService = branchService;
        }

        [Authorize(Roles = UserManagement.RoleName)]
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
        
        
        [HttpPost]
        public IActionResult GetAllBranches()
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

                var branchList = branchService.GetAllBranches();

                //Search
                if (!string.IsNullOrEmpty(searchValue))
                {
                    searchValue = searchValue.ToLower();
                    branchList = branchList.Where(obj => obj.BranchName.ToLower().Contains(searchValue));
                }

                resultTotal = branchList.Count();

                var result = branchList.Skip(skip).Take(pageSize).ToList();
                return Json(new { draw = draw, recordsFiltered = resultTotal, recordsTotal = resultTotal, data = branchList });

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        
        [HttpGet]
        public IActionResult GetBranchById(long id)
        {

            var banch = branchService.GetBranchById(id);
            return Json(new { data = banch });
        }

       
        [HttpDelete]
        public IActionResult DeleteBranch(long id)
        {

            var result = branchService.DeleteBranch(id);
            if (result != 0)
            {
                return Json(new { data = "Failed to delete a record" });
            }
            return Json(new { data = "Success" });
        }

    
       
        [HttpGet]
        public IActionResult AddEditBranch(long id)
        {
            Models.Branch _branchViewModel = new Models.Branch();
            if (id > 0)
            {
                _branchViewModel = branchService.GetBranchById(id);
                return PartialView("_EditBranch", _branchViewModel);
            }
            return PartialView("_AddBranch", _branchViewModel);
        }

        
        [HttpPost]
        public async Task<JsonResult> AddEditBranch(Models.Branch branch)
        {
            JsonResultViewModel _JsonResultViewModel = new JsonResultViewModel();
            try
            {

                if (branch.BranchId == 0)
                {
                    var result = branchService.CreateBranch(branch);

                    _JsonResultViewModel.AlertMessage = "Branch Created Successfully. Branch Name: " + branch.BranchName;
                    //_JsonResultViewModel.CurrentURL = _UserProfileViewModel.CurrentURL;
                    _JsonResultViewModel.IsSuccess = true;
                    return new JsonResult(_JsonResultViewModel);

                }
                else
                {
                    var result = branchService.UpdateBranch(branch);
                    _JsonResultViewModel.AlertMessage = "Branch Update Successfully. Branch Name: " + branch.BranchName;
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
