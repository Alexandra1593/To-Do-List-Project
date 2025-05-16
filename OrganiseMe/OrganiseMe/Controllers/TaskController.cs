
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using OrganiseMe.Models;
[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private static List<TaskItem> tasks = new();

    [HttpPost]
    public IActionResult CreateTask([FromBody] TaskItem task)
    {
        if (task.Title == null || task.Column == null)
            return BadRequest("Titlul și coloana sunt obligatorii.");

        task.Id = tasks.Count > 0 ? tasks.Max(t => t.Id) + 1 : 1;
        tasks.Add(task);
        return Ok(task);
    }

    [HttpGet]
    public IActionResult GetTasks()
    {
        return Ok(tasks);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteTask(int id)
    {
        var task = tasks.FirstOrDefault(t => t.Id == id);
        if (task == null) return NotFound();

        tasks.Remove(task);
        return NoContent();
    }
}
