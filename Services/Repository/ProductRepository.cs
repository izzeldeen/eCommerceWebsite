using DataAccess;
using Domain;
using Microsoft.EntityFrameworkCore;
using Services.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Services.Repository
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        private readonly StoreContext _context;

        public ProductRepository(StoreContext context) : base(context)
        {
            _context = context;
        }

        public void Update(Product Product) =>
            _context.Update(Product);
        
    }
}
