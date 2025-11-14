import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const response = await fetch('/api/users')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await response.json()
  return data
}

export default { getAll }