using ECS.Helper;
using System;
using System.Collections.Generic;

namespace ECS.API.Models
{
    public class ApiOutputError
    {
        public int Id { get; set; }

        public DateTime CreationDate { get; set; }

        public string BriefDescription { get; set; }

        public string FullDescription { get; set; }

        public ErrorStatus Status { get; set; }

        public ErrorPriority Priority { get; set; }

        public ErrorSeriousness Seriousness { get; set; }

        public string UserLogin { get; set; }

        public IReadOnlyList<ApiOutputHistory> Histories { get; set; }
    }
}
