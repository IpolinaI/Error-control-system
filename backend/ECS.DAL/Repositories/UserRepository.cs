using ECS.BLL;
using ECS.BLL.Entities;
using ECS.DAL.Models;
using System.Linq;

namespace ECS.DAL.Repositories
{
    internal class UserRepository : IUserRepository
    {
        private readonly PostgresContext _context;

        public UserRepository(PostgresContext context)
        {
            _context = context;
        }

        public int Add(User user)
        {
            var result = _context.Add(new DalUser
            {
                Login = user.Login,
                Password = user.Password
            });

            _context.SaveChanges(true);

            return result.Entity.Id;
        }

        public int GetByLogin(string login)
        {
            var result = GetDalUser(login);

            return result != null ? result.Id : -1;
        }

        public int GetByLoginAndPassword(string login, string password)
        {
            var result = GetDalUser(login);

            return result != null && result.Password == password ? result.Id : -1;
        }

        private DalUser GetDalUser(string login)
        {
            return _context.Users
                .Where(u => u.Login == login)
                .FirstOrDefault();
        }
    }
}
