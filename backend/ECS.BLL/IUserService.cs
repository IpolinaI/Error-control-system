using ECS.BLL.Entities;

namespace ECS.BLL
{
    public interface IUserService
    {
        public int Create(User user);

        public int LogIn(User user);
    }
}
