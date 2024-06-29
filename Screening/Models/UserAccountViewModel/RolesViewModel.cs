using System.ComponentModel.DataAnnotations;

namespace CompliancePortal.Models.UserAccountViewModel
{
    public class RolesViewModel
    {
        [Display(Name = "SL")]
        public int Id { get; set; }
        [Display(Name = "Role Name")]
        public string Name { get; set; }
        public string RoleID { get; set; }
    }
}
