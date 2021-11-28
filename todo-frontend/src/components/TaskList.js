import React, { useState, useEffect } from "react";
import Task from "./Task";
import taskService from "../services/tasks";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { ListItem } from "@mui/material";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';

const TaskList = ({ folderId }) => {
  console.log(folderId);
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState("");
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    taskService.getTasksFromFolder(folderId).then((initialTasks) => {
      setTasks(initialTasks);
    });
  }, []);

  const addTask = (event) => {
    event.preventDefault();
    const taskObject = {
      description: newTask,
    };

    taskService.create(taskObject, folderId).then((returnedTask) => {
      setTasks(tasks.concat(returnedTask));
      setNewTask("");
    });
  };

  const toggleStatusOf = (id) => {
    const task = tasks.find((n) => n.id === id);
    const changedTask = { ...task, completed: !task.completed };

    taskService
      .update(id, changedTask)
      .then((returnedTask) => {
        setTasks(tasks.map((task) => (task.id !== id ? task : returnedTask)));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTaskChange = (event) => {
    console.log(event.target.value);
    setNewTask(event.target.value);
  };

  const deleteTaskFromState = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const startEditing = (id) => {
    setEditing(id);
    setNewTask(tasks.filter((t) => t.id === id)[0].description);
  };

  const tasksToShow = tasks;
  const updateNote = (event) => {
    const taskStatus = tasks.filter((t) => t.id === editing)[0].completed;
    event.preventDefault();
    const taskObject = {
      description: newTask,
      completed: taskStatus,
    };

    taskService.update(editing, taskObject).then((returnedTask) => {
      setTasks(tasks.map((t) => (t.id === returnedTask.id ? returnedTask : t)));
      setNewTask("");
      setEditing("");
    });
  };
  //console.log(notes.map(n => n.id === editing))
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <h2>Tasks</h2>
          </ListSubheader>
        }
      >
        {tasksToShow.map((task) => (
          <Task
            key={task.id}
            task={task}
            toggleStatus={() => toggleStatusOf(task.id)}
            deleteTaskFromState={() => deleteTaskFromState(task.id)}
            startEditing={() => startEditing(task.id)}
          />
        ))}
        <ListItem>
      <Box
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        {editing !== "" ? (
          <form onSubmit={updateNote} style={{display: 'inline-flex'}}>
             <Stack spacing={2} direction="row">
            <TextField
              id="outlined-basic"
              label={newTask}
              variant="outlined"
              value={newTask}
              onChange={handleTaskChange}
            />
            <Button variant='outlined' type="submit">update</Button>
            </Stack>
          </form>
        ) : (
          <form onSubmit={addTask} style={{display: 'inline-flex'}}>
             <Stack spacing={2} direction="row">
            <TextField
              id="outlined-basic"
              label={newTask}
              variant="outlined"
              value={newTask}
              onChange={handleTaskChange}
            />
            <Button variant='outlined' type="submit">add task!</Button>
            </Stack>
          </form>
        )}
      </Box>

        </ListItem>
      </List>
    </Box>
  );
};
/*
      {(editing !== '') ? (
            //{console.log(notes.filter(n => n.id === editing).task)}
        <form onSubmit={updateNote}>
          <input
            value={newTask}
            onChange={handleTaskChange}
          />
          <button type="submit">update</button>
        </form>  
      ) : (
        <form onSubmit={addTask}>
          <input
            value={newTask}
            onChange={handleTaskChange}
          />
          <button type="submit">add task!</button>
        </form>  
      )
      }
        <form onSubmit={updateNote}>
          <TextField id="outlined-basic" label={newTask} variant="outlined" value={newTask} onChange={handleTaskChange}/>
          <button type="submit">update</button>
        </form>  
*/

export default TaskList;
