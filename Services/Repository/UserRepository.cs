using DataAccess;
using Domain;
using Services.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Repository
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        private readonly StoreContext _context;
        public UserRepository(StoreContext context) : base(context)
        {
            _context = context;
        }

        public User GetUser(string UserId) => 
            _context.Users.Find(UserId);
        
    }
}
