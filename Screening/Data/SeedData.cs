using System.Collections.Generic;
using CompliancePortal.Helpers;
using CompliancePortal.Models.UserAccountViewModel;

namespace CompliancePortal.Data
{
    public class SeedData
    {
        public IEnumerable<UserProfileViewModel> GetUserProfileList()
        {
            return new List<UserProfileViewModel>
            {
                new UserProfileViewModel { FirstName = "Tshifhiwa", LastName = "Rautshahalo", Email = "tshifhiwar1@gmail.com", PasswordHash = "Password01#", ConfirmPassword = "Password01#", PhoneNumber= StaticData.RandomDigits(11), ProfilePicture = "/upload/DefaultUser/sample-user1.jpg", Address = "Johanessburg", Country = "South Africa" },
                new UserProfileViewModel { FirstName = "Shonisani", LastName = "Rautshahalo", Email = "shoni.rali@gmail.com", PasswordHash = "Password01#", ConfirmPassword = "Password01#", PhoneNumber= StaticData.RandomDigits(11), ProfilePicture = "/upload/DefaultUser/sample-user2.jpg", Address = "Johanessburg", Country = "South Africa" },
                new UserProfileViewModel { FirstName = "Tsire", LastName = "Rautshahalo", Email = "tsire.rau@gmail.com", PasswordHash = "Password01#", ConfirmPassword = "Password01#", PhoneNumber= StaticData.RandomDigits(11), ProfilePicture = "/upload/DefaultUser/sample-user3.jpg", Address = "Johanessburg", Country = "South Africa" },               
            };
        }
    }
}
