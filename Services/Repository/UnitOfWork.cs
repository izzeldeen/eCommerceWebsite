using DataAccess;
using Services.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly StoreContext _context;
        public UnitOfWork(StoreContext context)
        {
            _context = context;
            Product = new ProductRepository(_context);
            Category = new CategoryRepository(_context);
            User = new UserRepository(_context);
        }
        public IProductRepository Product { get; private set; }
        public ICategoryRepository Category { get; private set; }
        public IUserRepository User { get; set; }

        public void Dispose()
        {
            _context.Dispose();
        }

        public void Save()
        {
            _context.SaveChanges();      
        }
    }
}
