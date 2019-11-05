using ECS.Helper;
using System;
using System.Collections.Generic;

namespace ECS.BLL.Entities
{
    public class Error
    {
        public int Id { get; set; }

        public DateTime CreationDate { get; set; }

        public string BriefDescription { get; set; }

        public string FullDescription { get; set; }

        public ErrorStatus Status { get; set; }

        public ErrorPriority Priority { get; set; }

        public ErrorSeriousness Seriousness { get; set; }

        public int UserId { get; set; }

        public string UserLogin { get; set; }

        public IReadOnlyList<History> Histories { get; set; }
    }
}
