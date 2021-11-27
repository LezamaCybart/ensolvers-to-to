import React, { useState } from 'react'
import taskService from '../services/tasks'

const Task = ({ task, toggleStatus, deleteTaskFromState, startEditing }) => {
  const label = task.completed
    ? 'TODO' : 'DONE'

  const deleteNote = (id) => {
    taskService
      .deleteN(id)
      .then(response => {
        deleteTaskFromState(id)
      })
  }
  return (
    <li className='note'>
      {task.description} 
      <button onClick={toggleStatus}>{label}</button>
      <button onClick={() => deleteNote(task.id)}>Delete</button>
      <button onClick={startEditing}>Edit</button>
    </li>
  )
}

export default Task