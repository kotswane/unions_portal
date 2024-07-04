using CompliancePortal.Data;
using CompliancePortal.Models;
using CompliancePortal.Repository.AsyncInterface;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using static CompliancePortal.Pages.MainMenu;

namespace CompliancePortal.Repository
{
    public class EmployerRepository:IEmployerRepository
    {
        private readonly ApplicationDbContext _context;

        public EmployerRepository(ApplicationDbContext applicationDb)
        {
            _context = applicationDb;
        }

        public async Task<long> CreateEmployer(Models.Employer employer)
        {
            using (IDbConnection db = new SqlConnection(_context.Database.GetConnectionString()))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@EmployerEmail", employer.EmployerEmail);
                parameters.Add("@EmployerName", employer.EmployerName);
                parameters.Add("@EmployerAddress", employer.EmployerAddress);
                parameters.Add("@EmployerContactNumber", employer.EmployerContactNumber);
                parameters.Add("@EmployerId", dbType: DbType.Int64, direction: ParameterDirection.Output);

                var result = await db.QuerySingleAsync<long>("[dbo].[CreateEmployer]", parameters, commandType: CommandType.StoredProcedure);

                return result; // The new MemberId
            }
        }

        public async Task<int> DeleteEmployer(long id)
        {
            using (var connector = new SqlConnection(_context.Database.GetConnectionString()))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@EmployerId", id, DbType.Int64);
                parameters.Add("@RowsAffected", dbType: DbType.Int32, direction: ParameterDirection.Output);

                connector.Execute("dbo.DeleteEmployer", parameters, commandType: CommandType.StoredProcedure);

                // Retrieve the value of the output parameter
                return parameters.Get<int>("@RowsAffected");
            }
        }

        public async Task<IEnumerable<Models.Employer>> GetAllEmployers()
        {
   
            using (IDbConnection connector = new SqlConnection(_context.Database.GetConnectionString()))
            {
                string storedProcedure = "GetAllEmployers";
                return await connector.QueryAsync<Models.Employer>(storedProcedure, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<Models.Employer> GetEmployerById(long id)
        {
            using (var connector = new SqlConnection(_context.Database.GetConnectionString()))
                return await connector.QueryFirstAsync<Models.Employer>("GetEmployerById", new
                {
                    EmployerId = id
                }, commandType: CommandType.StoredProcedure);
        }

        public async Task<int> UpdateEmployer(Models.Employer employer)
        {
            using (var connection = new SqlConnection(_context.Database.GetConnectionString()))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@EmployerId", employer.EmployerId, DbType.Int64);
                parameters.Add("@EmployerEmail", employer.EmployerEmail, DbType.String);
                parameters.Add("@EmployerName", employer.EmployerName, DbType.String);
                parameters.Add("@EmployerAddress", employer.EmployerAddress, DbType.String);
                parameters.Add("@EmployerContactNumber", employer.EmployerContactNumber, DbType.String);
                parameters.Add("@RowsAffected", dbType: DbType.Int32, direction: ParameterDirection.Output);

                await connection.ExecuteAsync("dbo.UpdateEmployer", parameters, commandType: CommandType.StoredProcedure);

                // Retrieve the value of the output parameter
                return parameters.Get<int>("@RowsAffected");
            }
        }
    }
}
