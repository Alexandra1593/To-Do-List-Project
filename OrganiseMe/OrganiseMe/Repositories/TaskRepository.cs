using Microsoft.EntityFrameworkCore;
using OrganiseMe.Data;
using OrganiseMe.Models;
namespace OrganiseMe.Repositories
{


public class TaskRepository : ITaskRepository
{
    private readonly AppDbContext _context;

    public TaskRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TaskItem>> GetAllAsync() =>
        await _context.Tasks.ToListAsync();

    public async Task<TaskItem?> GetByIdAsync(int id) =>
        await _context.Tasks.FindAsync(id);

    public async Task AddAsync(TaskItem task)
    {
        await _context.Tasks.AddAsync(task);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(TaskItem task)
    {
        _context.Tasks.Update(task);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(TaskItem task)
    {
        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<TaskItem>> GetByStatusAsync(string status)
    {
        return await _context.Tasks
            .Where(t => t.Status != null && t.Status.ToLower() == status.ToLower())
            .ToListAsync();
    }
}
}