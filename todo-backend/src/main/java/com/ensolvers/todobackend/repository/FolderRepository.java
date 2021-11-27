package com.ensolvers.todobackend.repository;

import com.ensolvers.todobackend.domain.Folder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FolderRepository extends JpaRepository<Folder, Long> {

}
