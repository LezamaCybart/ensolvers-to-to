package com.ensolvers.todobackend.service;

import com.ensolvers.todobackend.domain.Folder;
import com.ensolvers.todobackend.repository.FolderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FolderService {
    private final FolderRepository folderRepository;

    public FolderService(FolderRepository folderRepository) {
        this.folderRepository = folderRepository;
    }

    public List<Folder> getFolders() {
        return folderRepository.findAll();
    }

    public Folder addFolder(Folder newFolder) {
        return folderRepository.save(newFolder);
    }

    public void deleteFolder(Long folderId) {
        folderRepository.deleteById(folderId);
    }
}
