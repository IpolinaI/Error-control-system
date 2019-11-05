using ECS.BLL;
using ECS.BLL.Entities;
using ECS.DAL.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace ECS.DAL.Repositories
{
    internal class ErrorRepository : IErrorRepository
    {
        private readonly PostgresContext _context;

        public ErrorRepository(PostgresContext context)
        {
            _context = context;
        }

        public int Add(Error error)
        {
            var result = _context.Add(new DalError
            {
                CreationDate = error.CreationDate,
                BriefDescription = error.BriefDescription,
                FullDescription = error.FullDescription,
                Status = error.Status,
                Priority = error.Priority,
                Seriousness = error.Seriousness,
                DalUserId = error.UserId
            });

            _context.SaveChanges(true);

            return result.Entity.Id;
        }

        public Error Get(int id)
        {
            var error = _context.Errors
                .Where(e => e.Id == id)
                .Include(e => e.User)
                .Include(e => e.Histories)
                .ThenInclude(h => h.User)
                .FirstOrDefault();

            return new Error
            {
                Id = error.Id,
                CreationDate = error.CreationDate,
                BriefDescription = error.BriefDescription,
                FullDescription = error.FullDescription,
                Status = error.Status,
                Priority = error.Priority,
                Seriousness = error.Seriousness,
                UserId = error.DalUserId,
                UserLogin = error.User.Login,
                Histories = error.Histories
                    .Select(h => new History
                    {
                        Date = h.Date,
                        Action = h.Action,
                        Comment = h.Comment,
                        UserId = h.DalUserId,
                        ErrorId = h.DalErrorId,
                        UserLogin = h.User.Login
                    })
                    .ToList()
            };
        }

        public IEnumerable<Error> GetAll()
        {
            return _context.Errors
                .Include(e => e.User)
                .Select(e => new Error
                { 
                    Id = e.Id,
                    CreationDate = e.CreationDate,
                    BriefDescription = e.BriefDescription,
                    FullDescription = e.FullDescription,
                    Status = e.Status,
                    Priority = e.Priority,
                    Seriousness = e.Seriousness,
                    UserId = e.DalUserId,
                    UserLogin = e.User.Login
                });
        }

        public void Update(Error error)
        {
            var originalError = _context.Errors
                .AsNoTracking()
                .Where(e => e.Id == error.Id)
                .FirstOrDefault();

            _context.Update(new DalError
            {
                Id = error.Id,
                CreationDate = originalError.CreationDate,
                BriefDescription = originalError.BriefDescription,
                FullDescription = originalError.FullDescription,
                Status = error.Status,
                Priority = originalError.Priority,
                Seriousness = originalError.Seriousness,
                DalUserId = originalError.DalUserId
            });

            _context.SaveChanges(true);
        }
    }
}
