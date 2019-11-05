using ECS.BLL;
using ECS.BLL.Entities;
using ECS.DAL.Models;

namespace ECS.DAL.Repositories
{
    internal class HistoryRepository : IHistoryRepository
    {
        private readonly PostgresContext _context;

        public HistoryRepository(PostgresContext context)
        {
            _context = context;
        }

        public int Add(History history)
        {
            var result = _context.Add(new DalHistory
            {
                Date = history.Date,
                Action = history.Action,
                Comment = history.Comment,
                DalUserId = history.UserId,
                DalErrorId = history.ErrorId
            });

            _context.SaveChanges(true);

            return result.Entity.Id;
        }
    }
}
