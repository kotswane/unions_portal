using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using CompliancePortal.Models;

namespace CompliancePortal.Services
{
    public interface IFunctional
    {
        Task CreateDefaultSuperAdmin();
        Task CreateDefaultOtherUser();

        Task SendEmailBySendGridAsync(string apiKey,
            string fromEmail,
            string fromFullName,
            string subject,
            string message,
            string email);

        Task SendEmailByGmailAsync(string fromEmail,
            string fromFullName,
            string subject,
            string messageBody,
            string toEmail,
            string toFullName,
            string smtpUser,
            string smtpPassword,
            string smtpHost,
            int smtpPort,
            bool smtpSSL);

        Task CreateDefaultEmailSettings();

        Task CreateDefaultIdentitySettings();
        Task<DefaultIdentityOptions> GetDefaultIdentitySettings();

        Task<string> UploadFile(List<IFormFile> files, IWebHostEnvironment env, string uploadFolder);

    }
}
