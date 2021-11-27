import React, { useState, useEffect } from 'react'
import Folder from './components/Folder'
import folderService from './services/folders'

const App = () => {
  const [folders, setFolders] = useState([])
  const [newFolder, setNewFolder] = useState('')

  useEffect(() => {
    folderService
      .getAll()
      .then(initialFolders => {
      setFolders(initialFolders)
    })
  }, [])

  const addFolder = (event) => {
    event.preventDefault()
    const folderObject = {
      name: newFolder,
    }

    folderService
      .create(folderObject)
        .then(returnedFolder => {
        setFolders(folders.concat(returnedFolder))
        setNewFolder('')
      })
  }

  const handleFolderChange = (event) => {
    console.log(event.target.value)
    setNewFolder(event.target.value)
  }

  const deleteFolderFromState = (id) => {
    setFolders(folders.filter(t => t.id !== id))
  }

  const foldersToShow = folders
  //console.log(notes.map(n => n.id === editing))
  return (
    <div>
      <h1>Folders</h1>
      <ul>
        {foldersToShow.map(folder => 
            <Folder
              key={folder.id}
              task={folder} 
              deleteFolderFromState={() => deleteFolderFromState(folder.id)}
            />
        )}
      </ul>
        <form onSubmit={addFolder}>
          <input
            value={newFolder}
            onChange={handleFolderChange}
          />
          <button type="submit">add new folder!</button>
        </form>  
      )
    </div>
  )
}

export default App