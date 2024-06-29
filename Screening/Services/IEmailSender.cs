﻿using System.Threading.Tasks;

namespace CompliancePortal.Services
{
    public interface IEmailSender
    {
        Task<Task> SendEmailAsync(string email, string subject, string message);
    }
}
