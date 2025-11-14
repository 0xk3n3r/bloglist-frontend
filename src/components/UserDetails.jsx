import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../store/userSlice'

const UserDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const user = users.find(u => u.id === id)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Username: {user.username}</p>
      <h3>Blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserDetails