using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.IRepository
{
    public interface IUserRepository : IRepository<User>
    {
        User GetUser(string UserId);
    }
}
