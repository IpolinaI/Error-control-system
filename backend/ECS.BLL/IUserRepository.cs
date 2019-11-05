using ECS.BLL.Entities;

namespace ECS.BLL
{
    public interface IUserRepository
    {
        public int Add(User user);

        public int GetByLogin(string login);

        public int GetByLoginAndPassword(string login, string password);
    }
}