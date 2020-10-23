using System;
using System.Collections.Generic;
using System.Text;

namespace Services.IRepository
{
    public interface IUnitOfWork : IDisposable
    {
        IProductRepository Product { get; }
        ICategoryRepository Category { get; }
        IUserRepository User { get; }
        void Save();
    }
}
