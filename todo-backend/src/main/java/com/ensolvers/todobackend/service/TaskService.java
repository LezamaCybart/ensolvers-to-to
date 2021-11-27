package com.ensolvers.todobackend.service;

import com.ensolvers.todobackend.domain.Folder;
import com.ensolvers.todobackend.domain.Task;
import com.ensolvers.todobackend.repository.FolderRepository;
import com.ensolvers.todobackend.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final FolderRepository folderRepository;

    public TaskService(TaskRepository taskRepository, FolderRepository folderRepository) {
        this.taskRepository = taskRepository;
        this.folderRepository = folderRepository;
    }
    public List<Task> getTasks() {
        return taskRepository.findAll();
    }

    public List<Task> getTasksFromFolder(Long id) {
        return taskRepository.getTaskFromFolder(id);
    }

    public Task createTask(Task newTask, Long folderId) {
        Folder folder = folderRepository.getById(folderId);
        newTask.setCompleted(Boolean.FALSE);
        newTask.setFolder(folder);
        return taskRepository.save(newTask);
    }

    public Task updateTask(Task updatedTask, Long taskId) {
        Task task;
        Optional<Task> taskOrNull = taskRepository.findById(taskId);

        task = taskOrNull.get(); //TODO logic to check if it's empty.
        task.setDescription(updatedTask.getDescription());
        task.setCompleted(updatedTask.getCompleted());

        return taskRepository.save(task);
    }

    public void deleteTask(Long taskId){
        taskRepository.deleteById(taskId);
    }
}
