import React, { useState } from "react";
import taskService from "../services/tasks";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
//import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
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
          <ListItemSecondaryAction
          style={{display: 'inline-flex'}}
          >
            <IconButton onClick={() => deleteNote(task.id)}>
              <DeleteIcon/>
            </IconButton>
            <IconButton onClick={startEditing}>
              <EditIcon/>
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
/*
    <li className='note'>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={toggleStatus}
      />
      {task.completed ? (
        <span><s>{task.description}</s></span>
      ) : (
        <span>{task.description}</span>
      )}
      <button onClick={() => deleteNote(task.id)}>Delete</button>
      <button onClick={startEditing}>Edit</button>
    </li>
      <button onClick={() => deleteNote(task.id)}>Delete</button>
      <button onClick={startEditing}>Edit</button>
        <button onClick={() => deleteNote(task.id)}>Delete</button>
*/

export default Task;
