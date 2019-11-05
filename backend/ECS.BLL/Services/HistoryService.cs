using ECS.BLL.Entities;
using ECS.Helper;
using System.Collections.Generic;

namespace ECS.BLL.Services
{
    public class HistoryService : IHistoryService
    {
        private readonly IHistoryRepository _historyRepository;
        private readonly IErrorRepository _errorRepository;

        public HistoryService(IHistoryRepository historyRepository, IErrorRepository errorRepository)
        {
            _historyRepository = historyRepository;
            _errorRepository = errorRepository;
        }

        public int Create(History history)
        {
            ErrorStatus errorStatus = ErrorStatus.New;

            switch(history.Action)
            {
                case HistoryAction.Opening:
                    errorStatus = ErrorStatus.Opened;
                    break;
                case HistoryAction.Closing:
                    errorStatus = ErrorStatus.Closed;
                    break;
                case HistoryAction.Resolving:
                    errorStatus = ErrorStatus.Resolved;
                    break; 
            }

            _errorRepository.Update(new Error
            {
                Id = history.ErrorId,
                Status = errorStatus
            });

            return _historyRepository.Add(history);
        }
    }
}
