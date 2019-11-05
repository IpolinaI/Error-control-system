using ECS.BLL.Entities;
using System.Collections.Generic;

namespace ECS.BLL
{
    public interface IErrorRepository
    {
        public int Add(Error error);

        public Error Get(int id);

        public IEnumerable<Error> GetAll();

        public void Update(Error error);
    }
}
