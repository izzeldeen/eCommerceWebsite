using DataAccess;
using Domain;
using Services.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Repository
{
    public class CategoryRepository : Repository<Category> , ICategoryRepository
    {
        private readonly StoreContext _context;
        public CategoryRepository(StoreContext context) : base(context)
        {
            _context = context;
        }
        public void Update(Category Category)
        {
            _context.Update(Category);
        }
    }
}
