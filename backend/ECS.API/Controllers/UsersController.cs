using Microsoft.AspNetCore.Mvc;
using ECS.BLL;
using ECS.BLL.Entities;
using ECS.API.Models;

namespace ECS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public int Create([FromBody] ApiInputUser user)
        {
            var id = _userService.Create(new User
            {
                Login = user.Login,
                Password = user.Password
            });

            return id;
        }

        [HttpGet("{login}/{password}")]
        public int LogIn(string login, string password)
        {
            var id = _userService.LogIn(new User
            {
                Login = login,
                Password = password
            });

            return id;
        }
    }
}
