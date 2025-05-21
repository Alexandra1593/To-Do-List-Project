using OrganiseMe.Models;
using OrganiseMe.Repositories;  
namespace OrganiseMe.Services
{

public class TaskService : ITaskService
{
    private readonly ITaskRepository _repo;

    public TaskService(ITaskRepository repo)
    {
        _repo = repo;
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
}

}