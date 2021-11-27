import React, { useState, useEffect } from 'react'
import Folder from './components/Folder'
import folderService from './services/folders'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')

  useEffect(() => {
    folderService
      .getAll()
      .then(initialTasks => {
      setTasks(initialTasks)
    })
  }, [])

  const addTask = (event) => {
    event.preventDefault()
    const taskObject = {
      name: newTask,
    }

    folderService
      .create(taskObject)
        .then(returnedTask => {
        setTasks(tasks.concat(returnedTask))
        setNewTask('')
      })
  }

  const handleTaskChange = (event) => {
    console.log(event.target.value)
    setNewTask(event.target.value)
  }

  const deleteTaskFromState = (id) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const tasksToShow = tasks
  //console.log(notes.map(n => n.id === editing))
  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasksToShow.map(task => 
            <Folder
              key={task.id}
              task={task} 
              deleteTaskFromState={() => deleteTaskFromState(task.id)}
            />
        )}
      </ul>
        <form onSubmit={addTask}>
          <input
            value={newTask}
            onChange={handleTaskChange}
          />
          <button type="submit">add task!</button>
        </form>  
      )
    </div>
  )
}

export default App