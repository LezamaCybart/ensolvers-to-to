package com.ensolvers.todobackend.controller;

import com.ensolvers.todobackend.domain.Folder;
import com.ensolvers.todobackend.service.FolderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class FolderController {

    private  final FolderService folderService;

    public FolderController(FolderService folderService) {
        this.folderService = folderService;
    }

    @GetMapping("/folder")
    public ResponseEntity<?> getFolders() {
        return new ResponseEntity<>(folderService.getFolders(), HttpStatus.OK);
    }

    @PostMapping("/folder")
    public ResponseEntity<?> addFolder(Folder newFolder) {
        return new ResponseEntity<>(folderService.addFolder(newFolder), HttpStatus.CREATED);
    }

    @DeleteMapping("/folder/{id}")
    public ResponseEntity<?> deleteFolder(@PathVariable Long id) {
        folderService.deleteFolder(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
