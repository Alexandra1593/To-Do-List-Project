﻿using System;
using System.ComponentModel.DataAnnotations;

namespace OrganiseMe.Models
{
    public class TaskItem
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        [Required]
        public string Status { get; set; } // "To-Do", "In Progress", "Done"

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
