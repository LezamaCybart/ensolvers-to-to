import React from "react";
import taskService from "../services/tasks";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
//import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import { IconButton } from "@mui/material";

const Task = ({ task, toggleStatus, deleteTaskFromState, startEditing }) => {
  const label = task.completed ? "TODO" : "DONE";

  const deleteNote = (id) => {
    taskService.deleteN(id).then((response) => {
      deleteTaskFromState(id);
    });
  };
  return (
    <ListItem
      secondaryAction={
        <ListItemSecondaryAction style={{ display: "inline-flex" }}>
          <IconButton onClick={() => deleteNote(task.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={startEditing}>
            <EditIcon />
          </IconButton>
        </ListItemSecondaryAction>
      }
      //disablePadding
    >
      <ListItemButton role={undefined} onClick={toggleStatus} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={task.completed}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText
          style={{ textDecoration: task.completed ? "line-through" : "none" }}
          primary={task.description}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default Task;
