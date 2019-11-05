using ECS.Helper;

namespace ECS.API.Models
{
    public class ApiInputHistory
    {
        public HistoryAction Action { get; set; }

        public string Comment { get; set; }

        public int ErrorId { get; set; }

        public int UserId { get; set; }
    }
}
