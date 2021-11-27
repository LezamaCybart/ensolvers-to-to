package com.ensolvers.todobackend.service;

import com.ensolvers.todobackend.domain.Task;
import com.ensolvers.todobackend.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }
    public List<Task> getTasks() {
        return taskRepository.findAll();
    }

    public Task createTask(Task newTask) {
        newTask.setCompleted(Boolean.FALSE);
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
