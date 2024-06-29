using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using CompliancePortal.Data;

namespace CompliancePortal.Helpers
{
    public class ProcessDataTable<T> : Controller where T : class
    {
        private readonly ApplicationDbContext _context;
        public ProcessDataTable(ApplicationDbContext context)
        {
            _context = context;
        }
        public IActionResult GetDataTabelData(T entity)
        {
            try
            {
                return null;

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}
