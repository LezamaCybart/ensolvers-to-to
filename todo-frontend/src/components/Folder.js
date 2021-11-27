import React, { useState } from 'react'
import folderService from '../services/folders'
import TaskList from './TaskList'

const Folder = ({ task: folder,  deleteFolderFromState}) => {
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
      {folder.name} 
      <button onClick={() => setViewTasks(!viewTasks)}>open</button>
      <button onClick={() => deleteFolder(folder.id)}>Delete</button>
      {viewTasks ? (
        <TaskList 
          folderId={folder.id}
        />
      ) : (
        <span></span>
      )
      }

    </li>
  )
}

export default Folder