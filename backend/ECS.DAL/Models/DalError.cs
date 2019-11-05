using ECS.Helper;
using System;
using System.Collections.Generic;

namespace ECS.DAL.Models
{
    public class DalError
    {
        public int Id { get; set; }

        public DateTime CreationDate { get; set; }

        public string BriefDescription { get; set; }

        public string FullDescription { get; set; }

        public ErrorStatus Status { get; set; }

        public ErrorPriority Priority { get; set; }

        public ErrorSeriousness Seriousness { get; set; }

        public int DalUserId { get; set; }
        public DalUser User { get; set; }

        public ICollection<DalHistory> Histories { get; set; }

        public DalError()
        {
            Histories = new List<DalHistory>();
        }
    }
}
