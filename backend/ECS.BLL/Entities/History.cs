using ECS.Helper;
using System;

namespace ECS.BLL.Entities
{
    public class History
    {
        public DateTime Date { get; set; }

        public HistoryAction Action { get; set; }

        public string Comment { get; set; }

        public int UserId { get; set; }

        public string UserLogin { get; set; }

        public int ErrorId { get; set; }
    }
}
