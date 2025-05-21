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
}
}