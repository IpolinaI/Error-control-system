using ECS.Helper;

namespace ECS.API.Models
{
    public class ApiOutputHistory
    {
        public HistoryAction Action { get; set; }

        public string Comment { get; set; }

        public string UserLogin { get; set; }
    }
}
