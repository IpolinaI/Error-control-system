using ECS.BLL.Entities;
using ECS.Helper;
using System.Collections.Generic;

namespace ECS.BLL.Services
{
    public class ErrorService : IErrorService
    {
        private readonly IErrorRepository _errorRepository;
        private readonly IHistoryRepository _historyRepository;

        private readonly string _historyDefaultComment = "Error has been created";

        public ErrorService(IErrorRepository errorRepository, IHistoryRepository historyRepository)
        {
            _errorRepository = errorRepository;
            _historyRepository = historyRepository;
        }

        public int Create(Error error)
        {
            var errorId = _errorRepository.Add(error);

            _historyRepository.Add(new History
            {
                Date = error.CreationDate,
                Action = HistoryAction.Creation,
                Comment = _historyDefaultComment,
                UserId = error.UserId,
                ErrorId = errorId
            });

            return errorId;
        }

        public Error Get(int id)
        {
            return _errorRepository.Get(id);
        }

        public IEnumerable<Error> GetList()
        {
            return _errorRepository.GetAll();
        }
    }
}
