﻿using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.IRepository
{
    public interface ICategoryRepository : IRepository<Category>
    {
        void Update(Category Category);
    }
}
