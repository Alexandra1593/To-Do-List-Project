using OrganiseMe.Models;
namespace OrganiseMe.Services
{


public interface ITaskService
{

    Task<IEnumerable<TaskItem>> GetAllAsync();
    Task<TaskItem?> GetByIdAsync(int id);
    Task CreateAsync(TaskItem task);
    Task UpdateAsync(TaskItem task);
    Task DeleteAsync(int id);
    Task<IEnumerable<TaskItem>> GetByStatusAsync(string status);

        Task<List<TaskItem>> GetTasksByUserIdAsync(int userId);
        Task AddTaskAsync(TaskItem task);
    }
}

