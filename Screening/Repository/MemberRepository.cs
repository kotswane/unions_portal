using CompliancePortal.Data;
using CompliancePortal.Models;
using CompliancePortal.Repository.AsyncInterface;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using static CompliancePortal.Pages.MainMenu;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace CompliancePortal.Repository
{
    public class MemberRepository: IMemberRepository
    {
        private readonly ApplicationDbContext _context;
       
        public MemberRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<long> AddAsync(BranchMembers member)
        {
            using (IDbConnection db = new SqlConnection(_context.Database.GetConnectionString()))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@MemberFirstname", member.MemberFirstname);
                parameters.Add("@MemberMiddleName", member.MemberMiddleName);
                parameters.Add("@MemberSurname", member.MemberSurname);
                parameters.Add("@MemberIdNumber", member.MemberIdNumber);
                parameters.Add("@MemberAddress", member.MemberAddress);
                parameters.Add("@MemberContactNumber", member.MemberContactNumber);
                parameters.Add("@MemberEmployerId", member.MemberEmployerId);
                parameters.Add("@MemberBranchId", member.MemberBranchId);

                var result = await db.QuerySingleAsync<long>("[dbo].[InsertMember]", parameters, commandType: CommandType.StoredProcedure);

                return result; // The new MemberId
            }
        }

        public async Task<int> DeleteAsync(long memberBranchId)
        {
            using (var connector = new SqlConnection(_context.Database.GetConnectionString()))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@MemberId", memberBranchId, DbType.Int64);
                parameters.Add("@RowsAffected", dbType: DbType.Int32, direction: ParameterDirection.Output);

                connector.Execute("dbo.DeleteMember", parameters, commandType: CommandType.StoredProcedure);

                // Retrieve the value of the output parameter
                return parameters.Get<int>("@RowsAffected");
            }
        }

        public async Task<IEnumerable<BranchMembersDTO>> GetAllAsync(long memberBranchId)
        {
            using (var connector = new SqlConnection(_context.Database.GetConnectionString()))
                return await connector.QueryAsync<BranchMembersDTO>("GetMembersByBranchId", new
                {
                    memberBranchId
                }, commandType: CommandType.StoredProcedure);
        }

        public async Task<BranchMembers> GetByIdAsync(long memberId)
        {
            using (var connector = new SqlConnection(_context.Database.GetConnectionString()))
            return await connector.QueryFirstAsync<BranchMembers>("GetMembersById", new
            {
                memberId
            }, commandType: CommandType.StoredProcedure);
        }


        public async Task<int> UpdateMemberAsync(BranchMembers memberBranch)
        {
            using (var connection = new SqlConnection(_context.Database.GetConnectionString()))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@MemberId", memberBranch.MemberId, DbType.Int64);
                parameters.Add("@MemberFirstname", memberBranch.MemberFirstname, DbType.String);
                parameters.Add("@MemberMiddleName", memberBranch.MemberMiddleName, DbType.String);
                parameters.Add("@MemberSurname", memberBranch.MemberSurname, DbType.String);
                parameters.Add("@MemberIdNumber", memberBranch.MemberIdNumber, DbType.String);
                parameters.Add("@MemberAddress", memberBranch.MemberAddress, DbType.String);
                parameters.Add("@MemberContactNumber", memberBranch.MemberContactNumber, DbType.String);
                parameters.Add("@MemberEmployerId", memberBranch.MemberEmployerId, DbType.Int64);
                parameters.Add("@RowsAffected", dbType: DbType.Int32, direction: ParameterDirection.Output);

                await connection.ExecuteAsync("dbo.UpdateMember", parameters, commandType: CommandType.StoredProcedure);

                // Retrieve the value of the output parameter
                return parameters.Get<int>("@RowsAffected");
            }
        }

    }
}
