package com.ensolvers.todobackend.repository;

import com.ensolvers.todobackend.domain.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query("SELECT t FROM Task t WHERE t.folder.id = :folderId")
    List<Task> getTaskFromFolder(@Param("folderId") Long folderId);
}
