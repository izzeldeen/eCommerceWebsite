using System;
using System.Collections.Generic;
using System.Text;

namespace Services.IRepository
{
    public interface IUnitOfWork : IDisposable
    {
        void Save();
    }
}
