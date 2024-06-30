using System;

namespace CompliancePortal.Models
{
    public class UserLinkToEntityDTO
    {
        public string UserId { get; set; }
        public int LinkToEntityTypeId { get; set; }
        public string? LinkToEntityTypeValue { get; set; }
    }
}
