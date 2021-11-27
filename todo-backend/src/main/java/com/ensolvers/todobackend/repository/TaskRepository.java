package com.ensolvers.todobackend.repository;

import com.ensolvers.todobackend.domain.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
