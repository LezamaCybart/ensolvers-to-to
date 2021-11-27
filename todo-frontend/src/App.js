import React, { useState, useEffect } from 'react'
import Task from './components/Task'
import taskService from './services/tasks'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [editing, setEditing] = useState('')
  const [newTask, setNewTask] = useState('')

  useEffect(() => {
    taskService
      .getAll()
      .then(initialTasks => {
      setTasks(initialTasks)
    })
  }, [])

  const addTask = (event) => {
    event.preventDefault()
    const taskObject = {
      description: newTask,
    }

    taskService
      .create(taskObject)
        .then(returnedTask => {
        setTasks(tasks.concat(returnedTask))
        setNewTask('')
      })
  }

  const toggleStatusOf = id => {
    const task = tasks.find(n => n.id === id)
    const changedTask = { ...task, completed: !task.completed }
  
    taskService
    .update(id, changedTask)
      .then(returnedTask => {
      setTasks(tasks.map(task => task.id !== id ? task : returnedTask))
    })
    .catch(error => {
      console.log(error)
    })    
  }

  const handleTaskChange = (event) => {
    console.log(event.target.value)
    setNewTask(event.target.value)
  }

  const deleteTaskFromState = (id) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const startEditing = (id) => {
    setEditing(id)
    setNewTask(tasks.filter(t => t.id === id )[0].description)
  }

  const tasksToShow = tasks
  const updateNote = (event) => {
    const taskStatus = tasks.filter(t => t.id === editing)[0].completed
    event.preventDefault()
    const taskObject = {
      description: newTask,
      completed: taskStatus
    }

    taskService
      .update(editing, taskObject)
        .then(returnedTask => {
        setTasks(tasks.map(t => (t.id === returnedTask.id) ? returnedTask : t))
        setNewTask('')
        setEditing('')
      })
  }
  //console.log(notes.map(n => n.id === editing))
  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasksToShow.map(task => 
            <Task
              key={task.id}
              task={task} 
              toggleStatus={() => toggleStatusOf(task.id)}
              deleteTaskFromState={() => deleteTaskFromState(task.id)}
              startEditing={() => startEditing(task.id)}
            />
        )}
      </ul>
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
    </div>
  )
}

export default App