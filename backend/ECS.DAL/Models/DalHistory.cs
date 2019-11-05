using ECS.Helper;
using System;

namespace ECS.DAL.Models
{
    public class DalHistory
    {
        public int Id { get; set; }

        public DateTime Date { get; set; }

        public HistoryAction Action { get; set; }

        public string Comment { get; set; }

        public int DalUserId { get; set; }
        public DalUser User { get; set; }

        public int DalErrorId { get; set; }
        public DalError Error { get; set; }
    }
}
