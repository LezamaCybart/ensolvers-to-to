import React, { useState } from "react";
import folderService from "../services/folders";
import TaskList from "./TaskList";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import { IconButton, Stack } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";

const Folder = ({ task: folder, deleteFolderFromState }) => {
  const [viewTasks, setViewTasks] = useState(false);

  const deleteFolder = (id) => {
    folderService.deleteFolder(id).then((response) => {
      deleteFolderFromState(id);
    });
  };
  return (
    <ListItem
      style={{ display: "list-item" }}
      secondaryAction={
        <ListItemSecondaryAction style={{ top: "0%", marginTop: "1px" }}>
          <IconButton edge="end" onClick={() => deleteFolder(folder.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      }
    >
      <ListItemButton
        role={undefined}
        onClick={() => setViewTasks(!viewTasks)}
        dense
      >
        <li className="note">
          <Stack direction="row">
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary={folder.name} />
          </Stack>
        </li>
      </ListItemButton>
      {viewTasks ? <TaskList folderId={folder.id} /> : <span></span>}
    </ListItem>
  );
};

export default Folder;
