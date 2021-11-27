import axios from 'axios'
const baseUrl = 'http://localhost:8080/folder'

const getTasksFromFolder = (folderId) => {
  const request = axios.get(`${baseUrl}/${folderId}/task`)
  return request.then(response => response.data)
}

/*
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
*/

const create = (newObject, folderId) => {
  const request = axios.post(`${baseUrl}/${folderId}/task`, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`http://localhost:8080/task/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteTask = (id) => {
  const request = axios.delete(`http://localhost:8080/task/${id}`)
  return request.then(response => response.data)
}

export default { 
  getTasksFromFolder, create, update, deleteN: deleteTask
}