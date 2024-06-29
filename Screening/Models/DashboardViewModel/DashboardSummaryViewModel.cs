using System;
using System.Collections.Generic;
using System.Security.Cryptography;

namespace CompliancePortal.Models.DashboardViewModel
{
    public class DashboardSummaryViewModel
    {
        public Int64 TotalUser { get; set; }    
        public Int64 TotalActive { get; set; }
        public Int64 TotalInActive { get; set; } 
        public List<UserProfile> listUserProfile { get; set; }
    }

    public class AlgoReading
    {
        public string IDNumber { get; set; }
        public string FundsSource { get; set; }
        public string ResidentialAddress { get; set; }
        public string IDPassportDoc { get; set; }
        public int Typeofclient { get; set; }
        public int ClientActingOnBehalf { get; set; }
        public int Owneridentifiable { get; set; }
        public int LocalOrForeignClient { get; set; }
        public int LocalOrForeignProduct { get; set; }
        public int ProductAllowUseOfCash { get; set; }
        public int ProdcutAllowCrossBorderFlowFunds { get; set; }
        public int ProdcutAllowPaypemtToThirdParties { get; set; }
        public int ProdcutAllowCoolOffPeriods { get; set; }
        public int ProdcutProvideAnonymity { get; set; }
        public int ProdcutCryptoNewTechnology { get; set; }
        public int ProdcutAcquiredPremiums { get; set; }
        public int HowClientIntoduced { get; set; }
        public int CanClientMaintainAnonymity { get; set; }
        public int HowClientCreateWealth { get; set; }
        public int HowLongWealthBeingInvested { get; set; }
        public string ClientName { get; set; }
        public string ClientSurname { get; set; }
        public string ClientEmail { get; set; }
        public string ClientPhone { get; set; }
        public int TransactionValue { get; set;}
        public int total_hits { get; set; }
    }
}
