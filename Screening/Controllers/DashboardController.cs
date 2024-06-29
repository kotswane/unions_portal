using CompliancePortal.Data;
using CompliancePortal.Models;
using CompliancePortal.Models.DashboardViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using System.Data;
using Microsoft.AspNetCore.Mvc.Rendering;
using PdfSharp.Pdf;
using SendGrid.Helpers.Mail;

namespace CompliancePortal.Controllers
{
    [Authorize]
    public class DashboardController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly ILogger _logger;
        private HttpClient apiClient;
        public DashboardController(ApplicationDbContext context,
            IConfiguration configuration,
            UserManager<ApplicationUser> userManager,
            ILogger<AccountController> logger,
            IHttpClientFactory factory)
        {
            _context = context;
            _configuration = configuration;
            _userManager = userManager;
            _logger = logger;
        }

        [Authorize(Roles = Pages.MainMenu.Dashboard.RoleName)]
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            

            return View();
        }


    }
}