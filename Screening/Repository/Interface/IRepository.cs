using System.Collections.Generic;

namespace CompliancePortal.Repository.Interface
{
    public interface IRepository<T> where T : class
    {
        IEnumerable<T> GetAll();
        T GetById(long id);
        void Insert(T entity);
        void Update(T entity);
        void Delete(long id);
        int Save();
    }
}
