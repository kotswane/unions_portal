using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace CompliancePortal.Pages
{
    public static class MainMenu
    {
        public static class Admin
        {
            public const string RoleName = "Admin";
        }

        public static class Dashboard
        {
            public const string PageName = "Dashboard";
            public const string RoleName = "Dashboard";
            public const string Path = "/Dashboard/Index";
            public const string ControllerName = "Dashboard";
            public const string ActionName = "Index";
        }

        public static class UserManagement
        {
            public const string PageName = "User Management";
            public const string RoleName = "User Management";
            public const string Path = "/UserManagement/Index";
            public const string ControllerName = "UserManagement";
            public const string ActionName = "Index";
        }
        public static class UserProfile
        {
            public const string PageName = "User Profile";
            public const string RoleName = "User Profile";
            public const string Path = "/UserProfile/Index";
            public const string ControllerName = "UserProfile";
            public const string ActionName = "Index";
        }
        public static class ManagePageAccess
        {
            public const string PageName = "Manage Page Access";
            public const string RoleName = "Manage Page Access";
            public const string Path = "/UserRole/Index";
            public const string ControllerName = "UserRole";
            public const string ActionName = "Index";
        }
        public static class EmailSetting
        {
            public const string PageName = "Email Setting";
            public const string RoleName = "Email Setting";
            public const string Path = "/EmailSetting/Index";
            public const string ControllerName = "EmailSetting";
            public const string ActionName = "Index";
        }

        public static class IdentitySetting
        {
            public const string PageName = "Identity Setting";
            public const string RoleName = "Identity Setting";
            public const string Path = "/IdentitySetting/Index";
            public const string ControllerName = "IdentitySetting";
            public const string ActionName = "Index";
        }

        public static class LoginHistory
        {
            public const string PageName = "Login History";
            public const string RoleName = "Login History";
            public const string Path = "/LoginHistory/Index";
            public const string ControllerName = "LoginHistory";
            public const string ActionName = "Index";
        }
        public static class RefreshToken
        {
            public const string PageName = "JWT Token";
            public const string RoleName = "Refresh Token";
            public const string Path = "/RefreshToken/Index";
            public const string ControllerName = "RefreshToken";
            public const string ActionName = "Index";
        }

        public static class Region
        {
            public const string PageName = "Region";
            public const string RoleName = "Region";
            public const string Path = "/Region/Index";
            public const string ControllerName = "Region";
            public const string ActionName = "Index";
        }
        public static class Branch
        {
            public const string PageName = "Branch";
            public const string RoleName = "Branch";
            public const string Path = "/Branch/Index";
            public const string ControllerName = "Branch";
            public const string ActionName = "Index";
        }        
        
        public static class Member
        {
            public const string PageName = "Member";
            public const string RoleName = "Member";
            public const string Path = "/Member/Index";
            public const string ControllerName = "Member";
            public const string ActionName = "Index";
        }

        public static class Employer
        {
            public const string PageName = "Employer";
            public const string RoleName = "Employer";
            public const string Path = "/Employer/Index";
            public const string ControllerName = "Employer";
            public const string ActionName = "Index";
        }


    }
}
