import React, { useState } from 'react'
import folderService from '../services/folders'
import TaskList from './TaskList'

const Folder = ({ task,  deleteFolderFromState}) => {
  const [viewTasks, setViewTasks] = useState(false)

  const deleteFolder = (id) => {
    folderService
      .deleteFolder(id)
      .then(response => {
        deleteFolderFromState(id)
      })
  }
  return (
    <li className='note'>
      {task.name} 
      <button onClick={() => setViewTasks(!viewTasks)}>open</button>
      <button onClick={() => deleteFolder(task.id)}>Delete</button>
      {viewTasks ? (
        <TaskList
        />
      ) : (
        <span></span>
      )
      }

    </li>
  )
}

export default Folder