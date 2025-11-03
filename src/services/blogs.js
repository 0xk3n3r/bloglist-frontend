import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  return request.then(response => response.data)
}

const uplike = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  const blog = response.data
  try {
    const config = {
    headers: { Authorization: token }
  }
    const newObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: (blog.likes || 0) + 1,
    }
    const request = await axios.put(`${baseUrl}/${id}`, newObject, config)
    return request.data
  } catch (error) {
    console.error('Error in uplike:', error.response ? error.response.data : error.message)
    throw error}
}

const deleteBlog = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, setToken, uplike, deleteBlog}