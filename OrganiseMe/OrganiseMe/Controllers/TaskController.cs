using Microsoft.AspNetCore.Authorization;
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
        private readonly UserService _userService;

        public TaskController(ITaskService taskService, UserService userService)
        {
            _service = taskService;
            _userService = userService;
        }

        //[Authorize]
        //[HttpGet("mytasks")]
        //public async Task<IActionResult> GetMyTasks()
        //{
        //    var email = User.Identity?.Name;
        //    var user = await _userService.GetByEmailAsync(email);
        //    if (user == null) return Unauthorized();

        //    var tasks = await _taskService.GetTasksByUserIdAsync(user.Id);
        //    return Ok(tasks);
        //}

        //[Authorize]
        //[HttpPost("create")]
        //public async Task<IActionResult> Create([FromBody] TaskItem task)
        //{
        //    var email = User.Identity?.Name;
        //    var user = await _userService.GetByEmailAsync(email);
        //    if (user == null) return Unauthorized();

        //    task.UserId = user.Id;
        //    await _taskService.AddTaskAsync(task);
        //    return Ok("Task created");
        //}
    











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

        //POST: api/task
       [HttpPost]
        public async Task<IActionResult> Create(TaskItem task)
        {
            task.CreatedAt = DateTime.UtcNow;
            await _service.CreateAsync(task);
            return CreatedAtAction(nameof(Get), new { id = task.Id }, task);
        }


        //[Authorize]
        //[HttpPost("create")]
        //public async Task<IActionResult> CreateTask([FromBody] TaskItem task)
        //{
        //    var email = User.Identity?.Name;
        //    var user = await _userService.GetByEmailAsync(email!);

        //    if (user == null)
        //        return Unauthorized();

        //    task.UserId = user.Id;
        //    await _taskService.AddTaskAsync(task);

        //    return Ok("Task created");
        //}





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

        [Authorize]
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
