using Microsoft.AspNetCore.Mvc;
using OrganiseMe.Models;
using OrganiseMe.Services;



namespace OrganiseMe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _service;

        public TaskController(ITaskService service)
        {
            _service = service;
        }

        // GET: api/task
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var tasks = await _service.GetAllAsync();
            return Ok(tasks);
        }

        // GET: api/task/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var task = await _service.GetByIdAsync(id);
            return task == null ? NotFound() : Ok(task);
        }

        // POST: api/task
        [HttpPost]
        public async Task<IActionResult> Create(TaskItem task)
        {
            task.CreatedAt = DateTime.UtcNow;
            await _service.CreateAsync(task);
            return CreatedAtAction(nameof(Get), new { id = task.Id }, task);
        }

        // PUT: api/task/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, TaskItem task)
        {
            if (id != task.Id)
                return BadRequest("Id mismatch");

            await _service.UpdateAsync(task);
            return NoContent();
        }

        // DELETE: api/task/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }

        // GET: api/task/filter?status=urgent
        [HttpGet("filter")]
        public async Task<IActionResult> FilterByStatus([FromQuery] string status)
        {
            if (string.IsNullOrWhiteSpace(status))
                return BadRequest("Status is required.");

            var filtered = await _service.GetByStatusAsync(status);
            return Ok(filtered);
        }
    }
}
