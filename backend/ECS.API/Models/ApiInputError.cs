using ECS.Helper;

namespace ECS.API.Models
{
    public class ApiInputError
    {
        public string BriefDescription { get; set; }

        public string FullDescription { get; set; }

        public ErrorPriority Priority { get; set; }

        public ErrorSeriousness Seriousness { get; set; }

        public int UserId { get; set; }
    }
}
