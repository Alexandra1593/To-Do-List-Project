using OrganiseMe.Data;
using OrganiseMe.Models;
using Microsoft.EntityFrameworkCore;

using OrganiseMe.Repositories;
using OrganiseMe.Services;

public class TaskService : ITaskService
{
    private readonly ITaskRepository _repo;
    private readonly AppDbContext _context;

    public TaskService(ITaskRepository repo, AppDbContext context)
    {
        _repo = repo;
        _context = context;
    }

    public Task<IEnumerable<TaskItem>> GetAllAsync() => _repo.GetAllAsync();
    public Task<TaskItem?> GetByIdAsync(int id) => _repo.GetByIdAsync(id);
    public Task CreateAsync(TaskItem task) => _repo.AddAsync(task);
    public Task UpdateAsync(TaskItem task) => _repo.UpdateAsync(task);

    public async Task DeleteAsync(int id)
    {
        var existing = await _repo.GetByIdAsync(id);
        if (existing != null)
            await _repo.DeleteAsync(existing);
    }

    public Task<IEnumerable<TaskItem>> GetByStatusAsync(string status) => _repo.GetByStatusAsync(status);

    public async Task<List<TaskItem>> GetTasksByUserIdAsync(int userId)
    {
        return await _context.Tasks.Where(t => t.UserId == userId).ToListAsync();
    }

    public async Task AddTaskAsync(TaskItem task)
    {
        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();
    }
}
