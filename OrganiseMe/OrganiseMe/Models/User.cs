using Microsoft.Identity.Client;
using System.ComponentModel.DataAnnotations;

namespace OrganiseMe.Models
{
    public class User
    {
        //public int Id { get; set; }
        public int Id { get; set; }
        [Key]
        public string Email { get; set; }
        public string Password { get; set; } // Hashed in real apps
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }


        public ICollection<TaskItem>? Tasks { get; set; }
    }
}
