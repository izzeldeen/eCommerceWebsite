using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.IRepository
{
    public interface ITokenRepository
    {
        string CreateToken(User user);
    }
}
