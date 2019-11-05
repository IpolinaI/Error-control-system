using ECS.API.Models;
using ECS.BLL;
using ECS.BLL.Entities;
using ECS.Helper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ECS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ErrorsController : ControllerBase
    {
        private readonly IErrorService _errorService;

        public ErrorsController(IErrorService errorService)
        {
            _errorService = errorService;
        }

        [HttpPost]
        public int Create([FromBody] ApiInputError error)
        {
            return _errorService.Create(new Error
            {
                CreationDate = DateTime.Now,
                BriefDescription = error.BriefDescription,
                FullDescription = error.FullDescription,
                Status = ErrorStatus.New,
                Priority = error.Priority,
                Seriousness = error.Seriousness,
                UserId = error.UserId
            });
        }

        [HttpGet("{id}")]
        public ApiOutputError Get(int id)
        {
            var error = _errorService.Get(id);

            return new ApiOutputError
            {
                Id = error.Id,
                CreationDate = error.CreationDate,
                BriefDescription = error.BriefDescription,
                FullDescription = error.FullDescription,
                Status = error.Status,
                Priority = error.Priority,
                Seriousness = error.Seriousness,
                UserLogin = error.UserLogin,
                Histories = error.Histories
                    .Select(h => new ApiOutputHistory
                    {
                        Action = h.Action,
                        Comment = h.Comment,
                        UserLogin = h.UserLogin
                    })
                    .ToList()
            };
        }

        [HttpGet]
        public IEnumerable<ApiOutputError> GetAll()
        {
            return _errorService
                .GetList()
                .Select(e => new ApiOutputError
                {
                    Id = e.Id,
                    CreationDate = e.CreationDate,
                    BriefDescription = e.BriefDescription,
                    FullDescription = e.FullDescription,
                    Status = e.Status,
                    Priority = e.Priority,
                    Seriousness = e.Seriousness,
                    UserLogin = e.UserLogin
                });
        }
    }
}
