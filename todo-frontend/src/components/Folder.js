import React, { useState } from 'react'
import folderService from '../services/folders'
import TaskList from './TaskList'

const Task = ({ task, deleteTaskFromState}) => {
  const [viewTasks, setViewTasks] = useState(false)

  const deleteNote = (id) => {
    folderService
      .deleteFolder(id)
      .then(response => {
        deleteTaskFromState(id)
      })
  }
  return (
    <li className='note'>
      {task.name} 
      <button onClick={() => setViewTasks(!viewTasks)}>open</button>
      <button onClick={() => deleteNote(task.id)}>Delete</button>
      {viewTasks ? (
        <TaskList/>
      ) : (
        <span></span>
      )
      }

    </li>
  )
}

export default Task