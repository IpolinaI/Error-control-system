using ECS.API.Models;
using ECS.BLL;
using ECS.BLL.Entities;
using Microsoft.AspNetCore.Mvc;
using System;

namespace ECS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HistoriesController : ControllerBase
    {
        private readonly IHistoryService _historyService;

        public HistoriesController(IHistoryService historyService)
        {
            _historyService = historyService;
        }

        [HttpPost]
        public int Create([FromBody] ApiInputHistory history)
        {
            return _historyService.Create(new History
            {
                Date = DateTime.Now,
                Action = history.Action,
                Comment = history.Comment,
                UserId = history.UserId,
                ErrorId = history.ErrorId
            });
        }
    }
}
