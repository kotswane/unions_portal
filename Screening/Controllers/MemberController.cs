using CompliancePortal.ConHelper;
using CompliancePortal.Data;
using CompliancePortal.Models;
using CompliancePortal.Models.CommonViewModel;
using CompliancePortal.Models.UserAccountViewModel;
using CompliancePortal.Services;
using CompliancePortal.Services.Branch.Interface;
using CompliancePortal.Services.Member;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static CompliancePortal.Pages.MainMenu;

namespace CompliancePortal.Controllers
{
    [Authorize]
    [Route("[controller]/[action]")]
    public class MemberController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMemberService memberService;
        private readonly IBranchService branchService;
        public MemberController(UserManager<ApplicationUser> userManager,
            IMemberService memberService,
            IBranchService branchService)
        {
            _userManager = userManager;
            this.memberService = memberService;
            this.branchService = branchService;
        }

        [Authorize(Roles = UserManagement.RoleName)]
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> GetAllBranchMembers()
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

                var memberList = await memberService.GetAllMembersAsync();

                //Search
                if (!string.IsNullOrEmpty(searchValue))
                {
                    searchValue = searchValue.ToLower();
                    memberList = memberList.Where(obj => obj.MemberFirstname.ToLower().Contains(searchValue));
                }

                resultTotal = memberList.Count();

                var result = memberList.Skip(skip).Take(pageSize).ToList();
                return Json(new { draw = draw, recordsFiltered = resultTotal, recordsTotal = resultTotal, data = memberList });

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetMembersByBranch(long branchId)
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

                var memberList = await memberService.GetMembersByBranchIdAsync(Convert.ToInt64(branchId));

                //Search
                if (!string.IsNullOrEmpty(searchValue))
                {
                    searchValue = searchValue.ToLower();
                    memberList = memberList.Where(obj => obj.MemberFirstname.ToLower().Contains(searchValue));
                }

                resultTotal = memberList.Count();

                var result = memberList.Skip(skip).Take(pageSize).ToList();
                return Json(new { draw = draw, recordsFiltered = resultTotal, recordsTotal = resultTotal, data = memberList });

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        [HttpGet]
        public async Task<IActionResult> GetMemberById(long id)
        {

            var member = await memberService.GetMemberByIdAsync(id);
            return Json(new { data = member });
        }


        [HttpDelete]
        public async Task<IActionResult> DeleteMember(long id)
        {
            await memberService.DeleteMemberAsync(id);
            return Json(new { data = "Success" });
        }



        [HttpGet]
        public async Task<IActionResult> AddEditMember(long id)
        {
            var _branchViewModel = new BranchMembers();
            var memberDetails = new MemberApplicationUser();
            memberDetails.Employers = new();
            if (id > 0)
            {
                memberDetails.Member = await memberService.GetMemberByIdAsync(id);

                return PartialView("_EditMember", memberDetails);
            }

            memberDetails.Member = new BranchMembers();
            return PartialView("_AddMember", memberDetails);
        }


        [HttpPost]
        public async Task<JsonResult> AddEditMember(BranchMembers member)
        {
            JsonResultViewModel _JsonResultViewModel = new JsonResultViewModel();
            try
            {

                if (member.MemberId == 0)
                {
                    await memberService.AddMemberAsync(member);

                    _JsonResultViewModel.AlertMessage = $"BranchMembers Created Successfully. BranchMembers Name:  {member.MemberFirstname} {member.MemberSurname}";
                    //_JsonResultViewModel.CurrentURL = _UserProfileViewModel.CurrentURL;
                    _JsonResultViewModel.IsSuccess = true;
                    return new JsonResult(_JsonResultViewModel);

                }
                else
                {
                    await memberService.UpdateMemberAsync(member);
                    _JsonResultViewModel.AlertMessage = $"BranchMembers Update Successfully. BranchMembers Name: {member.MemberFirstname} {member.MemberSurname}";
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
