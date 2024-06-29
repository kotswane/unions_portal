using CompliancePortal.Data;
using CompliancePortal.Models;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace CompliancePortal.Repository
{
    public class ApplicationUserRepository
    {
        private readonly ApplicationDbContext _context;

        public ApplicationUserRepository(ApplicationDbContext applicationDb)
        {
            _context = applicationDb;
        }
        public async Task<UserLinkToEntityDTO> GetApplicationUserLinkToEntity(string email)
        {
            using (var connector = new SqlConnection(_context.Database.GetConnectionString()))
                return await connector.QueryFirstAsync<UserLinkToEntityDTO>("GetApplicationUserByEmail", new
                {
                    email
                }, commandType: System.Data.CommandType.StoredProcedure);
        }
    }
}
