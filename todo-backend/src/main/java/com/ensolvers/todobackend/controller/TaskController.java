package com.ensolvers.todobackend.controller;

import com.ensolvers.todobackend.domain.Task;
import com.ensolvers.todobackend.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/task")
    public ResponseEntity<?> getTasks() {
        return new ResponseEntity<>(taskService.getTasks(), HttpStatus.OK);
    }

    @GetMapping("/folder/{id}/task")
    public ResponseEntity<?> getTasksFromFolder(@PathVariable Long id) {
        return new ResponseEntity<>(taskService.getTasksFromFolder(id), HttpStatus.OK);
    }

    @PostMapping("/folder/{folderId}/task")
    public ResponseEntity<?> createTask(@RequestBody Task newTask, @PathVariable Long folderId) {
        return new ResponseEntity<>(taskService.createTask(newTask, folderId), HttpStatus.CREATED);
    }

    @PutMapping("task/{id}")
    public ResponseEntity<?> updateTask(@RequestBody Task updatedTask, @PathVariable Long id) {
        return new ResponseEntity<>(taskService.updateTask(updatedTask, id), HttpStatus.OK);
    }

    @DeleteMapping("/task/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
