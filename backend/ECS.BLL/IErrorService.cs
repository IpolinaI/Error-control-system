using ECS.BLL.Entities;
using System.Collections.Generic;

namespace ECS.BLL
{
    public interface IErrorService
    {
        public int Create(Error error);

        public Error Get(int id);

        public IEnumerable<Error> GetList();
    }
}
