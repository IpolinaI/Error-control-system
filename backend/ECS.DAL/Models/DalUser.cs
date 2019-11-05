using System.Collections.Generic;

namespace ECS.DAL.Models
{
    public class DalUser
    {
        public int Id { get; set; }

        public string Login { get; set; }

        public string Password { get; set; }

        public ICollection<DalError> Errors { get; set; }

        public ICollection<DalHistory> Histories { get; set; }

        public DalUser()
        {
            Errors = new List<DalError>();
            Histories = new List<DalHistory>();
        }
    }
}
