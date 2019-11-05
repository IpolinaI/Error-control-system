using ECS.BLL.Entities;

namespace ECS.BLL.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public int Create(User user)
        {
            var id = -1;

            if (_userRepository.GetByLogin(user.Login) == -1)
            {
                id = _userRepository.Add(user);
            }

            return id;
        }

        public int LogIn(User user)
        {
            return _userRepository.GetByLoginAndPassword(user.Login, user.Password);
        }
    }
}
